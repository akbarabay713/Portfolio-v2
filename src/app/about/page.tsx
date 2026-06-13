"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";

import Button from "@/components/atoms/Button";
import Tag from "@/components/atoms/Tag";
import SectionHeader from "@/components/molecules/SectionHeader";
import ExperienceTimeline from "@/components/molecules/ExperienceTimeline";
import { TechIcon } from "@/components/atoms/Icons/TechIcon";
import { bio, experiences, fadeUpVariants, techStack } from "@/constants";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16 pb-32">
      <SectionHeader title="About me" />

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mb-24 flex flex-col gap-8 md:flex-row lg:gap-16"
      >
        {/* Avatar + resume */}
        <div className="flex w-full flex-col gap-4 md:w-[35%]">
          <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-surface shadow-card">
            <Image
              src={bio.avatar}
              alt={`Portrait of ${bio.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
          </div>
          <Button
            as="a"
            href={bio.resumeUrl}
            variant="secondary"
            shape="rounded"
            size="lg"
            startIcon={<Download size={18} />}
            target="_blank"
          >
            Download résumé
          </Button>
        </div>

        {/* Bio + tech */}
        <div className="flex w-full flex-col md:w-[65%]">
          <p className="mb-4 text-xl font-medium text-content">
            {bio.greeting}
          </p>

          <div className="mb-10 flex flex-col gap-3 leading-relaxed text-muted">
            {bio.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <h2 className="mb-6 text-base font-bold text-content">
            Tools &amp; technologies I use
          </h2>

          <div className="flex flex-col gap-8">
            {techStack.map((category) => (
              <div key={category.label} className="flex flex-col gap-4">
                <span className="border-l-2 border-accent pl-3 text-sm font-semibold text-content">
                  {category.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((tech) => (
                    <Tag
                      key={tech}
                      className="cursor-default transition-transform hover:scale-105"
                      startIcon={<TechIcon name={tech} className="h-4 w-4" />}
                    >
                      {tech}
                    </Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <SectionHeader as="h2" title="Experience" />

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ExperienceTimeline experiences={experiences} />
      </motion.div>
    </main>
  );
}
