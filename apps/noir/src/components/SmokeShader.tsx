"use client";

import { useEffect, useRef } from "react";
import { audioState } from "@/lib/audio";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fbm value noise → flowing smoke, clustered toward the centre.
const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_audio;

float hash(vec2 p){ p = fract(p * vec2(123.34, 345.45)); p += dot(p, p + 34.345); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 6; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = uv * vec2(aspect, 1.0) * 3.0;
  float t = u_time * (0.06 + u_audio * 0.25);
  vec2 m = (u_mouse - 0.5) * 0.6;

  vec2 q = vec2(fbm(p + vec2(0.0, t) + m), fbm(p + vec2(5.2, 1.3 - t)));
  vec2 r = vec2(fbm(p + 2.0 * q + vec2(1.7, 9.2) + t * 0.5), fbm(p + 2.0 * q + vec2(8.3, 2.8) - t * 0.5));
  float f = fbm(p + 2.0 * r);
  f = smoothstep(0.05, 1.05, f);

  float rad = 1.0 - smoothstep(0.15, 0.95, length(uv - 0.5) * 1.25);
  float d = clamp(f * rad * (1.0 + u_audio * 1.6), 0.0, 1.0);

  vec3 base = vec3(0.039, 0.039, 0.047);
  vec3 fog  = mix(vec3(0.80, 0.83, 0.90), vec3(0.90, 0.92, 1.0), u_audio);
  gl_FragColor = vec4(mix(base, fog, d * 0.92), 1.0);
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
};

/**
 * WebGL smoke behind the hero. Falls back to the CSS radial glow underneath if
 * WebGL is unavailable, and renders a single static frame under reduced motion.
 */
const SmokeShader = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return; // CSS fallback under the canvas shows through

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uAudio = gl.getUniformLocation(prog, "u_audio");

    // Render at reduced resolution. Smoke is soft, so this is much cheaper.
    const scale = 0.55;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(2, Math.floor(r.width * scale));
      canvas.height = Math.max(2, Math.floor(r.height * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const mouse = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / r.width;
      mouse.y = 1 - (e.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stats = window as unknown as { __smokeFrames?: number };
    let raf = 0;
    let running = false;

    // Real-clock time so pausing/resuming never causes a visible jump.
    const draw = () => {
      gl.uniform1f(uTime, reduce ? 12 : performance.now() / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uAudio, audioState.level);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      stats.__smokeFrames = (stats.__smokeFrames ?? 0) + 1;
    };
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Only run while the hero is on-screen and the tab is visible.
    let onScreen = true;
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVis = () => {
      if (!document.hidden && onScreen) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVis);

    draw(); // paint an immediate first frame (also covers reduced-motion)
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* CSS fallback glow (shows if WebGL is unavailable) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 45%, rgba(160,168,190,0.10), transparent 70%)",
        }}
      />
      <canvas ref={ref} className="absolute inset-0 h-full w-full [filter:blur(6px)]" />
    </div>
  );
};

export default SmokeShader;
