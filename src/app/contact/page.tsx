import Body from "@/components/atoms/Body";
import Heading from "@/components/atoms/Heading";

const Contact = () => {
  return (
    <main id="contact" className="py-16 px-4 max-w-4xl mx-auto">
      <Heading variant="h1" weight="bold" className="text-center mb-4">
        Get in touch.
      </Heading>
      <Body variant="md" weight="regular" className="text-center mb-12">
        Have a project in mind or just want to say hello? I'd love to hear from
        you. Let's create something amazing together!
      </Body>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Heading variant="h2" weight="semibold" className="mb-4">
            Say Hello 👋
          </Heading>
          <Body variant="md" weight="regular" className="mb-4">
            Feel free to reach out via the form below
          </Body>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                placeholder="Subject of your message"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                placeholder="What I can help you with?"
                className="w-full p-2 border rounded h-32"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </form>
        </div>
        <div>
          <Heading variant="h2" weight="semibold" className="mb-4">
            Let's connect
          </Heading>
          <Body variant="md" weight="regular" className="mb-4">
            You can also find me on
          </Body>
          <div className="flex flex-col space-y-2 mb-4">
            <a
              href="https://github.com/pmint05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/pmint05/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/pmint05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://x.com/pmint05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              X
            </a>
            <a
              href="https://t.me/pmint05"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Telegram
            </a>
          </div>
          <Body variant="md" weight="regular" className="mb-2">
            Or reach me directly at:
          </Body>
          <a
            href="mailto:work.thongpham@gmail.com"
            className="text-blue-500 hover:underline"
          >
            work.thongpham@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
};

export default Contact;
