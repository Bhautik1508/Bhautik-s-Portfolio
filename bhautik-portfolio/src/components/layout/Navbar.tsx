import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "../../config/site";

/* ── Navigation links ── */
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  // ── Scroll progress bar (#1) ──
  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = (window.scrollY / scrollable) * 100;
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white"
      style={{ borderBottom: "1px solid #E5E4E0", height: 56 }}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* ── Left: Wordmark ── */}
        <Link
          to="/"
          className="font-display text-[18px] leading-none tracking-tight"
          style={{ color: "#111110", minHeight: "auto" }}
          aria-label="Home"
        >
          Bhautik Patel
        </Link>

        {/* ── Center: Desktop nav links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `relative pb-[2px] text-[14px] font-medium transition-colors duration-150 ${
                    isActive ? "text-[#111110]" : "text-[#6B7280] hover:text-[#111110]"
                  }`
                }
                style={{ minHeight: "auto" }}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute left-0 -bottom-[6px] h-[2px] w-full rounded-full"
                        style={{ backgroundColor: "#2D6A4F" }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right ── */}
        <div className="flex items-center gap-3">
          {/* "Available" badge */}
          {siteConfig.openToWork && (
            <span
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full text-[12px] font-medium"
              style={{
                backgroundColor: "#EAF3EE",
                color: "#2D6A4F",
                padding: "4px 10px",
                minHeight: "auto",
              }}
            >
              <span
                className="inline-block h-[6px] w-[6px] rounded-full animate-pulse"
                style={{ backgroundColor: "#2D6A4F" }}
              />
              Available
            </span>
          )}

          {/* Admin lock icon */}
          <Link
            to="/admin/login"
            aria-label="Admin"
            title="Admin"
            className="group flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-150"
            style={{ color: "#6B7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111110")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex md:hidden h-11 w-11 items-center justify-center rounded-md transition-colors duration-150"
            style={{ color: "#3D3D3A", border: "none", background: "none" }}
            aria-label="Toggle navigation"
          >
            <svg
              width="20"
              height="20"
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

      {/* ── Scroll progress bar (#1) ── */}
      <div
        data-testid="scroll-progress"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: "100%",
          background: "transparent",
          overflow: "hidden",
        }}
      >
        <div
          ref={progressRef}
          data-testid="scroll-progress-fill"
          style={{
            height: "100%",
            width: "0%",
            background: "#2D6A4F",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* ── Mobile fullscreen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white md:hidden"
            data-testid="mobile-overlay"
          >
            {/* Close button — top right */}
            <button
              onClick={closeMobile}
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-md"
              style={{ color: "#6B7280", border: "none", background: "none" }}
              aria-label="Close navigation"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ to, label }, i) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `font-display tracking-tight transition-colors duration-150 ${
                        isActive ? "text-[#2D6A4F]" : "text-[#111110]"
                      }`
                    }
                    style={{ fontSize: 28, minHeight: 44, display: "inline-flex", alignItems: "center" }}
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
