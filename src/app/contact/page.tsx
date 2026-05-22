"use client";

import { useState } from "react";
import Body from "@/components/atoms/Body";
import Heading from "@/components/atoms/Heading";
import { contactEmail, fadeUpVariants, socialLinks } from "@/constants";
import { Mail, Send } from "lucide-react";
import { motion } from "framer-motion";
import type { SocialLink } from "@/types/portfolio.types";

function SocialButton({ label, href, icon: Icon }: SocialLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-14 h-14 bg-gray-100 dark:bg-[#111118] border border-gray-200 dark:border-white/5 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 hover:bg-gray-200 dark:hover:bg-[#18181f] transition-all hover:scale-105"
    >
      <Icon width={22} height={22} />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center border-l-2 border-violet-500 pl-3 mb-2">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {children}
      </h2>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-gray-50 dark:bg-[#18181f] border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-shadow";

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Form submission error", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/[0.06] rounded-[2rem] p-6 lg:p-8 shadow-sm dark:shadow-none">
      <SectionLabel>Say Hello 👋</SectionLabel>
      <p className="text-sm text-gray-400 dark:text-gray-400 mb-8 ml-3">
        Feel free to reach out via the form below
      </p>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Name">
            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email address"
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Subject">
          <input
            type="text"
            name="subject"
            required
            placeholder="Subject of your message"
            className={inputClass}
          />
        </Field>
        <Field label="Message">
          <textarea
            name="message"
            required
            placeholder="What can I help you with?"
            className={`${inputClass} min-h-[120px] resize-none`}
          />
        </Field>

        {status === "success" && (
          <p className="text-green-500 text-sm font-medium ml-1">
            Message sent successfully! I will get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-sm font-medium ml-1">
            Something went wrong. Please try again or use my email directly.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-violet-500 hover:bg-violet-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl flex justify-center items-center gap-2 transition-colors mt-2"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Sending...</span>
          ) : (
            <>
              <Send size={18} /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function ConnectPanel() {
  return (
    <div className="flex flex-col mt-4 lg:mt-0">
      <SectionLabel>Let&apos;s connect</SectionLabel>
      <p className="text-sm text-gray-400 dark:text-gray-400 mb-8 ml-3">
        You can also find me on
      </p>

      <div className="flex flex-wrap gap-4 mb-10 ml-3">
        {socialLinks.map((social) => (
          <SocialButton key={social.label} {...social} />
        ))}
      </div>

      <p className="text-sm text-gray-400 dark:text-gray-400 mb-4 ml-3">
        Or reach me directly at:
      </p>
      <a
        href={`mailto:${contactEmail}`}
        className="flex items-center gap-3 ml-3 text-gray-700 dark:text-gray-200 hover:text-violet-500 dark:hover:text-violet-400 transition-colors font-medium"
      >
        <Mail size={18} className="text-gray-400" />
        {contactEmail}
      </a>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main id="contact" className="py-16 px-4 max-w-5xl mx-auto">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6 }}
      >
        <Heading className="mb-4 text-left">
          Get in touch<span className="text-violet-500">.</span>
        </Heading>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Body className="text-gray-500 dark:text-gray-400 leading-relaxed mb-12 max-w-2xl text-left">
          Have a project in mind or just want to say hello? I&apos;d love to
          hear from you.
        </Body>
      </motion.div>

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeUpVariants}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16">
          <ContactForm />
          <ConnectPanel />
        </div>
      </motion.div>
    </main>
  );
}
