import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import "./Footer.css";

/* ── Social icon data ── */
const ICON_LINKS = [
  {
    href: siteConfig.socials.linkedin,
    label: "LinkedIn",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: siteConfig.socials.github,
    label: "GitHub",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    href: siteConfig.socials.email,
    label: "Email",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

/* ── Navigation links ── */
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" data-testid="footer">
      <div className="footer__container">
        {/* ── Upper Section ── */}
        <div className="footer__upper">
          {/* LEFT — Brand block */}
          <div className="footer__brand">
            <p className="footer__brand-name">Bhautik Patel</p>
            <p className="footer__brand-tagline">
              Product Manager · Fintech · IIT Delhi MBA
              <br />
              Building products that move money and reduce risk.
            </p>
          </div>

          {/* CENTER — Nav links */}
          <nav className="footer__nav" aria-label="Footer navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="footer__nav-link link-animated">
                {label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — Social + Availability */}
          <div className="footer__social">
            <span className="footer__connect-label">Connect</span>

            <div className="footer__social-row">
              {ICON_LINKS.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer__social-btn"
                >
                  {icon}
                </a>
              ))}
            </div>

            {siteConfig.openToWork && (
              <div className="footer__availability">
                <span className="footer__availability-pill">
                  <span className="footer__pulse-dot" />
                  Open to Work
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Lower Section ── */}
        <div className="footer__lower">
          <p className="footer__lower-text">© 2025 Bhautik Patel</p>

          <div className="footer__lower-right">
            <span>Built with React + Firebase · </span>
            <button
              type="button"
              className="footer__back-to-top"
              onClick={handleBackToTop}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
