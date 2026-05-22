"use client";

import Link from "next/link";
import { navItems, socialLinks } from "@/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-gray-200 dark:border-white/5 pb-28">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Akbar<span className="text-violet-500">.</span>
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Software developer crafting modern web experiences with clean code
              and thoughtful design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Pages
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
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
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#111118] border border-gray-200 dark:border-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 hover:border-violet-500/30 transition-all"
                >
                  <social.icon width={18} height={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {currentYear} Akbar. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built with Next.js &bull; Designed with ♥
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
