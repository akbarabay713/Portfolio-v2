import Button from "@/components/atoms/Button/Button.component";
import Heading from "@/components/atoms/Heading/Heading.component";
import Body from "@/components/atoms/Body/Body.component";
import Image from "next/image";
import Link from "next/link";

const AboutUs = () => {
  return (
    <main id="about" className="py-16 px-4 max-w-4xl mx-auto">
      <Heading variant="h1" weight="bold" className="text-center mb-8">
        About me.
      </Heading>
      <div className="text-center mb-8">
        <Button as="a" href="/resume.pdf" download variant="default">
          Download my resume
        </Button>
      </div>
      <div className="text-center mb-12">
        <Body variant="lg" weight="regular" className="mb-4">
          Hi there, I'm Thong Pham 👋
        </Body>
        <Body variant="md" weight="regular" className="mb-2">
          I'm an Information Technology student at UET, VNU-HN with a strong
          interest in web development.
        </Body>
        <Body variant="md" weight="regular" className="mb-2">
          I enjoy designing intuitive front-end experiences and I'm currently
          expanding my skills in backend technologies.
        </Body>
        <Body variant="md" weight="regular">
          I'm actively learning and working towards becoming a capable
          full-stack developer.
        </Body>
      </div>
      <div className="mb-12">
        <Heading variant="h3" weight="semibold" className="mb-4">
          Tools & Technologies I use
        </Heading>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Heading variant="h4" weight="medium" className="mb-2">
              Front-end
            </Heading>
            <div className="flex flex-wrap gap-2">
              <Image
                src="/icons/javascript.svg"
                alt="JavaScript"
                width={40}
                height={40}
              />
              <Image
                src="/icons/react.svg"
                alt="React"
                width={40}
                height={40}
              />
              <Image
                src="/icons/html5.svg"
                alt="HTML5"
                width={40}
                height={40}
              />
              <Image src="/icons/css3.svg" alt="CSS3" width={40} height={40} />
              <Image
                src="/icons/tailwind.svg"
                alt="Tailwind CSS"
                width={40}
                height={40}
              />
              <Image src="/icons/sass.svg" alt="Sass" width={40} height={40} />
            </div>
          </div>
          <div>
            <Heading variant="h4" weight="medium" className="mb-2">
              Back-end
            </Heading>
            <div className="flex flex-wrap gap-2">
              <Image
                src="/icons/nodejs.svg"
                alt="Node.js"
                width={40}
                height={40}
              />
              <Image
                src="/icons/express.svg"
                alt="Express"
                width={40}
                height={40}
              />
              <Image
                src="/icons/nextjs.svg"
                alt="Next.js"
                width={40}
                height={40}
              />
              <Image
                src="/icons/python.svg"
                alt="Python"
                width={40}
                height={40}
              />
              <Image
                src="/icons/mongodb.svg"
                alt="MongoDB"
                width={40}
                height={40}
              />
              <Image
                src="/icons/firebase.svg"
                alt="Firebase"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div>
            <Heading variant="h4" weight="medium" className="mb-2">
              Tools
            </Heading>
            <div className="flex flex-wrap gap-2">
              <Image src="/icons/git.svg" alt="Git" width={40} height={40} />
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={40}
                height={40}
              />
              <Image
                src="/icons/postman.svg"
                alt="Postman"
                width={40}
                height={40}
              />
              <Image
                src="/icons/vercel.svg"
                alt="Vercel"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div>
            <Heading variant="h4" weight="medium" className="mb-2">
              UI Design
            </Heading>
            <Image src="/icons/figma.svg" alt="Figma" width={40} height={40} />
          </div>
        </div>
      </div>
      <div className="mb-12">
        <Heading variant="h1" weight="bold" className="mb-4">
          Experience.
        </Heading>
        <div className="mb-4">
          <Heading variant="h2" weight="semibold">
            Self-employed
          </Heading>
          <Body variant="md" weight="regular">
            Freelance Developer
          </Body>
          <Body variant="sm" weight="regular" className="text-gray-600">
            2024 - Present
          </Body>
          <Body variant="md" weight="regular">
            Developed custom websites and applications for clients. 3+ projects
            completed.
          </Body>
        </div>
      </div>
      <div className="mb-12">
        <Heading variant="h1" weight="bold" className="mb-4">
          Education.
        </Heading>
        <div>
          <Heading variant="h2" weight="semibold">
            University of Engineering and Technology, VNU-HN
          </Heading>
          <Body variant="md" weight="regular">
            Bachelor of Information Technology
          </Body>
          <Body variant="sm" weight="regular" className="text-gray-600">
            2023 — 2027
          </Body>
          <Body variant="md" weight="regular">
            Pursuing a Bachelor's degree in Information Technology with a focus
            on web development and software engineering.
          </Body>
        </div>
      </div>
      <div className="text-center">
        <Body variant="lg" weight="regular" className="mb-4">
          From Pixels
        </Body>
        <Link href="/projects" className="text-blue-500 hover:underline">
          My projects
        </Link>
        <Body variant="lg" weight="regular" className="mt-4">
          To Products
        </Body>
      </div>
    </main>
  );
};

export default AboutUs;
