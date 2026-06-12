"use client";

import Link from "next/link";
import { navItems, socialLinks, siteConfig } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line pb-28">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-2 text-lg font-bold text-content">
              {siteConfig.name}
              <span className="text-accent">.</span>
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.jobTitle} crafting modern web experiences with clean
              code and thoughtful design.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-content">
              Pages
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-content">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elevated text-muted transition-colors hover:bg-card-hover hover:text-accent"
                >
                  <social.icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <p className="text-xs text-faint">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-faint">Built with Next.js &bull; Designed with ♥</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
