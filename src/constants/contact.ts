import { IcGithub, IcLinkedin } from "@/components/atoms/Icons/SocialIcons";
import type { SocialLink } from "@/types/portfolio.types";

export const contactEmail = "akbarabu714@gmail.com";

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/akbarabay713", icon: IcGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/akbarabu/?locale=en_US",
    icon: IcLinkedin,
  },
];
