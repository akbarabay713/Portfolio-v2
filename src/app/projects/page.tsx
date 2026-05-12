import Body from "@/components/atoms/Body";
import Heading from "@/components/atoms/Heading";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Thong Pham Portfolio",
    description:
      "A personal portfolio website to showcase my skills and projects.",
    tech: ["React", "Next.js", "Tailwind CSS"],
    image: "/images/portfolio.png",
    live: "https://pmint05.github.io/portfolio/",
    github: "https://github.com/pmint05/portfolio",
  },
  {
    title: "LearnHub",
    description:
      "A Flutter app for generating quizzes using Gemini AI from files, text, image, url. Modern UI with dark mode support. I was in charge of the front-end development and UI design.",
    tech: ["Flutter", "Dart", "Firebase", "Big Assignment"],
    image: "/images/learnhub.png",
    live: "https://github.com/pmint05/learn-hub-fe/releases",
    github: "https://github.com/pmint05/learn-hub-fe",
  },
  {
    title: "Library Management System",
    description:
      "A JavaFX application for managing library operations, including book management, user management, and borrowing system.",
    tech: ["Java", "JavaFX", "MongoDB", "Big Assignment"],
    image: "/images/library.png",
    github: "https://github.com/pmint05/library-manager",
  },
  {
    title: "Sh0rtee",
    description:
      "A minimalist URL shortener built with Node.js, Express.js and Firebase.",
    tech: ["EJS", "CSS", "Node.js", "Firebase", "Express.js"],
    image: "/images/sh0rtee.png",
    live: "https://sh0rtee.vercel.app/",
    github: "https://github.com/pmint05/Shortee",
  },
  {
    title: "rDrive",
    description:
      "A personal cloud storage solution using a trick to host files on Discord, allowing you to upload and share files easily. Built with Node.js, Express.js, Firebase, and Discord API.",
    tech: ["EJS", "CSS", "Node.js", "Firebase", "Express.js"],
    image: "/images/rdrive.png",
    github: "https://github.com/pmint05/rdrive",
  },
  {
    title: "send2crush",
    description:
      "A fun web app to send your messages to your friend, built with EJS, Node.js, Express.js, and Firebase.",
    tech: ["EJS", "CSS", "Node.js", "Firebase", "Express.js"],
    image: "/images/send2crush.png",
    live: "https://send2crush.vercel.app/",
    github: "https://github.com/pmint05/send2crush",
  },
  {
    title: "QR Code Generator",
    description:
      "A simple web app to generate and scan QR codes for URLs. Using qrserver API.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "/images/qr.png",
    live: "https://pmint05.is-a.dev/qr/",
    github: "https://github.com/pmint05/qr",
  },
  {
    title: "Tool auto post group Facebook",
    description:
      "A tool to auto post content to Facebook groups using Puppeteer and ElectronJS.",
    tech: ["ElectronJS", "Puppeteer", "JavaScript"],
    image: "/images/facebook-tool.png",
    live: "https://github.com/pmint05/auto-post-group-release/releases",
    github: "https://github.com/pmint05/auto-post-group-facebook",
  },
  {
    title: "Tiktok Shop Manager",
    description:
      "A web app to manage, auto publish products, auto create promotions on Tiktok Shop. (Currently offline due to Tiktok Shop API policy changes)",
    tech: ["React", "Node.js", "Express.js", "Firebase", "MongoDB"],
    image: "/images/tiktok-manager.png",
    live: "https://tts-manager.vercel.app/",
    github: "https://github.com/pmint05/tts-manager",
  },
];

const Project = () => {
  return (
    <section id="projects" className="py-16 px-4 max-w-6xl mx-auto">
      <Heading variant="h1" weight="bold" className="text-center mb-4">
        Projects.
      </Heading>
      <Body variant="md" weight="regular" className="text-center mb-8">
        Explore my mini-projects showcasing my skills in web development and
        design. Each project reflects my passion for coding and creativity.
      </Body>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          All
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded">React</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Next.js</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Tailwind CSS</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Flutter</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Dart</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Firebase</button>
        <button className="px-4 py-2 bg-gray-200 rounded">
          Big Assignment
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded">Java</button>
        <button className="px-4 py-2 bg-gray-200 rounded">JavaFX</button>
        <button className="px-4 py-2 bg-gray-200 rounded">MongoDB</button>
        <button className="px-4 py-2 bg-gray-200 rounded">EJS</button>
        <button className="px-4 py-2 bg-gray-200 rounded">CSS</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Node.js</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Express.js</button>
        <button className="px-4 py-2 bg-gray-200 rounded">HTML</button>
        <button className="px-4 py-2 bg-gray-200 rounded">JavaScript</button>
        <button className="px-4 py-2 bg-gray-200 rounded">ElectronJS</button>
        <button className="px-4 py-2 bg-gray-200 rounded">Puppeteer</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="border rounded-lg p-4 shadow">
            <Image
              src={project.image}
              alt={project.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <Heading variant="h2" weight="semibold" className="mb-2">
              {project.title}
            </Heading>
            <Body variant="sm" weight="regular" className="mb-4">
              {project.description}
            </Body>
            <div className="flex flex-wrap gap-1 mb-4">
              {project.tech.map((tech, i) => (
                <span key={i} className="bg-gray-200 px-2 py-1 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Body variant="lg" weight="regular" className="mb-4">
          Crafted with care
        </Body>
        <Link href="/contact" className="text-blue-500 hover:underline">
          Get in touch
        </Link>
        <Body variant="lg" weight="regular" className="mt-4">
          Let's craft yours
        </Body>
      </div>
    </section>
  );
};

export default Project;
