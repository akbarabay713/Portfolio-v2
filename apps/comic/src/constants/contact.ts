import { IcGithub, IcLinkedin } from "@/components/atoms/Icons/SocialIcons";
import type { SocialLink } from "@/types/portfolio.types";
import { siteConfig } from "./site";

export const contactEmail = siteConfig.email;

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: siteConfig.links.github, icon: IcGithub },
  { label: "LinkedIn", href: siteConfig.links.linkedin, icon: IcLinkedin },
];
