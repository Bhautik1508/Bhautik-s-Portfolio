import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { RESUME_URL } from "../config/site";

/* ── Navigation links (PM-flavored board-game naming) ── */
const NAV_LINKS = [
  { href: "#opening-move", label: "Opening Move" },
  { href: "#campaign-log", label: "Campaign Log" },
  { href: "#mission-cards", label: "Mission Cards" },
  { href: "#contact", label: "Contact" },
] as const;

/* ── Hex dot SVG for active indicator ── */
function HexDot({ className = "" }: { className?: string }) {
  return (
    <svg
      width="8"
      height="9"
      viewBox="0 0 8 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="4,0.5 7.5,2.5 7.5,6.5 4,8.5 0.5,6.5 0.5,2.5"
        fill="#3B6D11"
      />
    </svg>
  );
}

/* ── Mobile menu animation variants ── */
const mobileMenuVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 0.03, 0.26, 1] },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 0.03, 0.26, 1] },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + i * 0.06, duration: 0.25, ease: "easeOut" },
  }),
};

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* Close mobile menu on route change */
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  /* Track active hash from URL */
  useEffect(() => {
    setActiveHash(location.hash);
  }, [location.hash]);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Close on Escape key */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  /* Scroll detection for backdrop blur */
  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Smooth scroll handler */
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      closeMobile();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Update URL hash without full navigation
      window.history.pushState(null, "", href);
      setActiveHash(href);
    },
    [closeMobile]
  );

  const isActive = (href: string) => activeHash === href;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: hasScrolled
          ? "rgba(249, 247, 243, 0.85)"
          : "rgba(249, 247, 243, 1)",
        backdropFilter: hasScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: hasScrolled ? "blur(12px)" : "none",
        borderBottom: hasScrolled ? "1px solid #E5E2D9" : "1px solid transparent",
      }}
    >
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-6"
        aria-label="Main navigation"
      >
        {/* ── Left: Wordmark ── */}
        <a
          href="/"
          className="font-display text-[20px] leading-none tracking-tight"
          style={{ color: "#1A1A18", minHeight: "auto" }}
          aria-label="Home"
        >
          Bhautik Patel
        </a>

        {/* ── Center: Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="group relative font-sans text-[13px] font-medium transition-colors duration-150"
                style={{
                  color: isActive(href) ? "#1A1A18" : "#6B7280",
                  minHeight: "auto",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(href)) e.currentTarget.style.color = "#1A1A18";
                }}
                onMouseLeave={(e) => {
                  if (!isActive(href)) e.currentTarget.style.color = "#6B7280";
                }}
              >
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-hex-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{ display: "inline-flex", lineHeight: 0 }}
                  >
                    <HexDot />
                  </motion.span>
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* ── Right side ── */}
        <div className="flex items-center gap-3">
          {/* Download Rulebook (resume) button — desktop */}
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-md font-sans text-[13px] font-medium transition-all duration-150"
            style={{
              padding: "8px 16px",
              backgroundColor: "#3B6D11",
              color: "#FFFFFF",
              textDecoration: "none",
              border: "none",
              minHeight: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2F5A0D";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3B6D11";
              e.currentTarget.style.transform = "";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Rulebook
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-md transition-colors duration-150"
            style={{ color: "#1A1A18", border: "none", background: "none" }}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-down menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "#F9F7F3",
              borderBottom: "1px solid #E5E2D9",
            }}
            data-testid="mobile-menu"
          >
            <div className="px-5 pb-6 pt-2">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.li
                    key={href}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                    custom={i}
                  >
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className="flex items-center gap-3 rounded-md py-3 px-3 font-sans text-[15px] font-medium transition-colors duration-150"
                      style={{
                        color: isActive(href) ? "#1A1A18" : "#6B7280",
                        textDecoration: "none",
                        backgroundColor: isActive(href)
                          ? "rgba(59, 109, 17, 0.06)"
                          : "transparent",
                      }}
                    >
                      {isActive(href) && <HexDot />}
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* Download Rulebook — mobile */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.25 }}
                className="mt-4 pt-4"
                style={{ borderTop: "1px solid #E5E2D9" }}
              >
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md font-sans text-[14px] font-medium w-full"
                  style={{
                    padding: "12px 16px",
                    backgroundColor: "#3B6D11",
                    color: "#FFFFFF",
                    textDecoration: "none",
                    border: "none",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download Rulebook
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
