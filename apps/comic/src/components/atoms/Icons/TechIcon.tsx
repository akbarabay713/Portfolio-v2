import Image from "next/image";

interface TechIconProps {
  name: string;
  className?: string;
}

const techToDeviconMap: Record<string, string> = {
  JavaScript: "javascript/javascript-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  React: "react/react-original.svg",
  "Next.js": "nextjs/nextjs-original.svg",
  Vue: "vuejs/vuejs-original.svg",
  "Nuxt.js": "nuxtjs/nuxtjs-original.svg",
  WordPress: "wordpress/wordpress-plain.svg",
  HTML: "html5/html5-original.svg",
  CSS: "css3/css3-original.svg",
  "Tailwind CSS": "tailwindcss/tailwindcss-original.svg",
  Sass: "sass/sass-original.svg",
  Laravel: "laravel/laravel-original.svg",
  jQuery: "jquery/jquery-original.svg",
  PHP: "php/php-original.svg",
  "Node.js": "nodejs/nodejs-original.svg",
  Express: "express/express-original.svg",
  Python: "python/python-original.svg",
  MongoDB: "mongodb/mongodb-original.svg",
  MySQL: "mysql/mysql-original.svg",
  Firebase: "firebase/firebase-plain.svg",
  Supabase: "supabase/supabase-original.svg",
  Git: "git/git-original.svg",
  GitHub: "github/github-original.svg",
  Postman: "postman/postman-original.svg",
  "VS Code": "vscode/vscode-original.svg",
  Figma: "figma/figma-original.svg",
};

export const TechIcon = ({ name, className = "" }: TechIconProps) => {
  const deviconPath = techToDeviconMap[name];

  if (!deviconPath) {
    // Fallback if not found in map
    return null;
  }

  const isDarkIcon = name === "Express" || name === "Next.js" || name === "GitHub" || name === "WordPress";

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconPath}`}
        alt={`${name} icon`}
        fill
        className={`object-contain ${isDarkIcon ? "dark:invert opacity-80 dark:opacity-100" : ""}`}
        sizes="24px"
      />
    </div>
  );
};
