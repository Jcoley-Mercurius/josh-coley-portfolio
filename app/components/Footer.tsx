 tsx
    // components/Footer.tsx
    
    import Link from "next/link";
    
    const NAV_LINKS = [
      { label: "About",    href: "#about"    },
      { label: "Work",     href: "#work"     },
      { label: "Services", href: "#services" },
      { label: "Contact",  href: "#contact"  },
    ];
    
    export default function Footer() {
      const year = new Date().getFullYear();
    
      return (
        <footer className="bg-slate-900 text-slate-400">
          {/* Main footer content */}
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
    
              {/* Column 1 — Identity */}
              <div className="space-y-3">
                <p className="text-white font-semibold text-lg tracking-tight">
                  Joshua Coley
                </p>
                <p className="text-sm leading-relaxed">
                  AI-powered websites and business tools for small businesses
                  across Southwest Florida.
                </p>
                <p className="text-sm flex items-center gap-1.5">
                  {/* pin icon — inline SVG, no extra deps */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 shrink-0 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.952-5.247 3.952-9.827a8.25 8.25 0 00-16.5 0c0 4.58 2.008 7.748 3.952 9.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cape Coral, Florida
                </p>
              </div>
    
              {/* Column 2 — Quick Nav */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                  Navigation
                </p>
                <ul className="space-y-2">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="text-sm hover:text-white transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
    
              {/* Column 3 — Contact & Social */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                  Get in Touch
                </p>
                <ul className="space-y-3">
                  {/* Email */}
                  <li>
                    <a
                      href="mailto:joshua@mercuriussolutions.com"
                      className="flex items-center gap-2 text-sm hover:text-white transition-colors duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                      joshua@mercuriussolutions.com
                    </a>
                  </li>
                  {/* LinkedIn */}
                  <li>
                    <a
                      href="https://www.linkedin.com/in/joshua-coley"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm hover:text-white transition-colors duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
    
            </div>
          </div>
    
          {/* Bottom bar */}
          <div className="border-t border-slate-800">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <span>© {year} Joshua Coley. All rights reserved.</span>
              <span>Cape Coral, Florida</span>
            </div>
          </div>
        </footer>
      );
    }