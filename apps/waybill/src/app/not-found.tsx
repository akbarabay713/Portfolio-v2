import Link from "next/link";
import { bio } from "@portfolio/content";

export default function NotFound() {
  return (
    <div className="wrap">
      <header className="bar">
        <Link className="bar-name" href="/">
          {bio.fullName.toUpperCase()}
        </Link>
      </header>
      <main id="main" className="lost">
        <h1>Not found</h1>
        <p>There’s no page at this address. Everything I’ve built is on the home page.</p>
        <Link className="btn btn-solid" href="/">
          Go to the home page
        </Link>
      </main>
    </div>
  );
}
