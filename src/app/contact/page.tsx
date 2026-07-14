"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import SectionHeader from "@/components/molecules/SectionHeader";
import { EASE_OUT, contactEmail, fadeUpVariants, socialLinks } from "@/constants";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 pb-32">
      <SectionHeader
        title="Get in touch"
        subtitle="Got a project, a role, or just want to say hi? Feel free to reach out."
      />

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
      >
        <Card className="ink-border ink-shadow flex flex-col items-center gap-8 p-8 sm:p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full ink-border bg-accent-dim">
            <Mail size={28} className="text-accent" />
          </div>

          <div className="text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-faint">
              Email me at
            </p>
            <a
              href={`mailto:${contactEmail}`}
              className="text-xl font-bold text-content transition-colors hover:text-accent sm:text-2xl"
            >
              {contactEmail}
            </a>
          </div>

          <Button
            as="a"
            href={`mailto:${contactEmail}`}
            variant="primary"
            caps
            startIcon={<Mail size={16} />}
          >
            Send an email
          </Button>

          <div className="flex w-full flex-col gap-3 border-t border-line pt-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg ink-border bg-elevated px-5 py-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-card-hover hover:shadow-[3px_3px_0_0_var(--outline)]"
              >
                <span className="flex items-center gap-3 font-semibold text-content">
                  <social.icon width={20} height={20} className="text-muted" />
                  {social.label}
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            ))}
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
