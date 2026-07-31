import { siteConfig } from "@portfolio/content";

/** vertical email on the left edge, desktop only. */
const EmailRail = () => (
  <a
    href={`mailto:${siteConfig.email}`}
    className="sideways fixed bottom-8 left-5 z-40 hidden text-xs text-faint transition-colors hover:text-accent lg:block"
  >
    {siteConfig.email}
  </a>
);

export default EmailRail;
