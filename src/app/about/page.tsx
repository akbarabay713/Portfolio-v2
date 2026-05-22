"use client";

import Body from "@/components/atoms/Body";
import Box from "@/components/atoms/Box/Box.component";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading/Heading.component";
import ExperienceTimeline from "@/components/molecules/ExperienceTimeline";
import { bio, experiences, fadeUpVariants, techStack } from "@/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { TechIcon } from "@/components/atoms/Icons/TechIcon";

export default function AboutPage() {
  return (
    <main id="about" className="py-16 px-4 max-w-5xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
      >
        <Heading className="mb-12">
          About me<span className="text-violet-500">.</span>
        </Heading>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Box className="flex flex-col md:flex-row gap-8 lg:gap-16 mb-24">
          <Box className="w-full md:w-[35%] flex flex-col gap-4">
            <Box className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#111118] border border-gray-200 dark:border-white/5 shadow-lg">
              <Image
                src={bio.avatar}
                alt={bio.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
            </Box>
            <Button
              as="a"
              href={bio.resumeUrl}
              className="w-full bg-gray-100 dark:bg-[#1A1A1A] hover:bg-gray-200 dark:hover:bg-[#2A2A2A] text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl py-6 flex items-center justify-center transition-colors"
            >
              Download my resume
            </Button>
          </Box>

          <Box className="w-full md:w-[65%] flex flex-col">
            <Body
              className="text-xl md:text-2xl italic mb-4 text-gray-900 dark:text-gray-200 font-medium"
              style={{ fontFamily: "'Dancing Script', 'Caveat', cursive" }}
            >
              {bio.greeting}
            </Body>

            <Box className="flex flex-col gap-2 text-gray-600 dark:text-gray-300 leading-loose mb-10 text-[15px]">
              {bio.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Box>

            <Body className="text-base font-semibold text-gray-900 dark:text-gray-200 mb-6">
              Tools &amp; Technologies I use
            </Body>

            <Box className="grid grid-cols-1  gap-x-8 gap-y-8">
              {techStack.map((category) => (
                <Box key={category.label} className="flex flex-col gap-4">
                  <Box className="flex items-center border-l-2 border-violet-500 pl-3">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.label}
                    </span>
                  </Box>
                  <Box className="flex flex-wrap gap-2">
                    {category.items.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-[#0d0d12] border border-gray-200 dark:border-white/5 text-xs font-semibold text-gray-500 dark:text-gray-400 transition-transform hover:scale-105 cursor-default"
                      >
                        <TechIcon name={tech} className="w-4 h-4" />
                        {tech}
                      </span>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Heading className="mb-12 mt-12">
          Experience<span className="text-violet-500">.</span>
        </Heading>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <ExperienceTimeline experiences={experiences} />
      </motion.div>
    </main>
  );
}
