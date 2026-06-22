export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-slate-500">
          &copy; {currentYear} Joshua Coley. Built with Next.js, Tailwind CSS
          &amp; purpose.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Jcoley-Mercurius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/joshuacoley"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            LinkedIn
          </a>
          <a
            href="mailto:jcoley@mercuriusmarketplace.com"
            className="text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
