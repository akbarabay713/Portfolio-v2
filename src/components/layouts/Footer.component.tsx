import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://github.com/pmint05"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pmint05/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com/pmint05"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://x.com/pmint05"
            target="_blank"
            rel="noopener noreferrer"
          >
            X
          </a>
          <a
            href="https://t.me/pmint05"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </div>
        <p>&copy; 2024 Thong Pham. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
