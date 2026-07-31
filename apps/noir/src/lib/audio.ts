/**
 * Shared mic level. The hero flow field reads `audioState.level` (0-1) each
 * frame; the mic toggle turns analysis on and off. Module singleton so the
 * button and the canvas see the same value without prop-drilling.
 */
export const audioState = { level: 0, active: false };

let ctx: AudioContext | null = null;
let stream: MediaStream | null = null;
let raf = 0;

/** Request the mic and start feeding a smoothed amplitude into audioState. */
export async function enableMic() {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  ctx = new AudioContext();
  await ctx.resume();
  const source = ctx.createMediaStreamSource(stream);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 256;
  source.connect(analyser);
  const data = new Uint8Array(analyser.frequencyBinCount);

  audioState.active = true;
  const tick = () => {
    analyser.getByteFrequencyData(data);
    let sum = 0;
    for (const v of data) sum += v;
    const avg = sum / data.length / 255; // 0..1
    audioState.level += (avg - audioState.level) * 0.35; // smooth
    (window as unknown as { __audioLevel?: number }).__audioLevel = audioState.level;
    raf = requestAnimationFrame(tick);
  };
  tick();
}

/** Stop analysis and release the mic. */
export function disableMic() {
  cancelAnimationFrame(raf);
  stream?.getTracks().forEach((t) => t.stop());
  ctx?.close().catch(() => {});
  ctx = null;
  stream = null;
  audioState.active = false;
  audioState.level = 0;
}
