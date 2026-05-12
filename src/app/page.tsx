"use client";

import Body from "@/components/atoms/Body";
import Heading from "@/components/atoms/Heading";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Home = () => {
  const [text] = useTypewriter({
    words: [
      "Hey, I’m Akbar 👋",
      "I build things for the web",
      "Fullstack Developer & Problem Solver",
    ],
    loop: true,
    delaySpeed: 2500,
    typeSpeed: 80,
    deleteSpeed: 40,
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <Image
          src="/images/avatar.png"
          alt="Akbar"
          width={120}
          height={120}
          className="rounded-full border border-neutral-200 shadow-sm"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="max-w-4xl mb-8"
      >
        <Heading variant="h1" weight="semibold" className="text-4xl!">
          {text}
          <Cursor cursorColor="green" />
        </Heading>
      </motion.div>

      {/* Professional Intro */}
      {/* <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-2xl mb-14"
      >
        <Body
          variant="lg"
          weight="regular"
          className="text-neutral-600 leading-8 text-lg md:text-xl"
        >
          I enjoy building modern web experiences that are fast, intuitive, and
          thoughtfully designed.
        </Body>

        <Body
          variant="lg"
          weight="regular"
          className="text-neutral-500 leading-8 text-lg md:text-xl mt-4"
        >
          Focused on frontend development, clean UI, smooth interactions, and
          creating products people genuinely enjoy using.
        </Body>
      </motion.div> */}

      {/* CTA Links */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap items-center justify-center gap-6"
      >
        <Link
          href="/about"
          className="px-5 py-2 rounded-full border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300"
        >
          More About Me
        </Link>

        <Link
          href="/projects"
          className="px-5 py-2 rounded-full border border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300"
        >
          What I’ve Built
        </Link>

        <Link
          href="/contact"
          className="px-5 py-2 rounded-full bg-neutral-900 text-white hover:bg-neutral-700 transition-all duration-300"
        >
          Let’s Talk
        </Link>
      </motion.div>
    </main>
  );
};

export default Home;
