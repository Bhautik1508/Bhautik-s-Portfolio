import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      // Navigate to home with hash — ScrollToTop will handle the scroll.
      navigate(`/${href}`);
      return;
    }
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(245, 240, 235, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "0.5px solid #DDD8D2" : "0.5px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-6">
        {/* Wordmark — stacked two lines */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            goHome();
          }}
          className="font-display leading-[1.1] text-ink hover:opacity-70 transition-opacity duration-200"
          style={{ fontSize: 20 }}
        >
          Bhautik
          <br />
          Patel.
        </a>

        {/* Desktop links — center-right */}
        <motion.ul
          className="hidden md:flex items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <motion.li
              key={href}
              variants={{
                hidden: { opacity: 0, y: -8 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
              }}
            >
              <button
                onClick={() => scrollTo(href)}
                className="font-sans transition-colors duration-200 hover:text-ink"
                style={{ fontSize: 15, color: "#3E3935" }}
              >
                {label}
              </button>
            </motion.li>
          ))}
          {/* CTA pill */}
          <motion.li
            variants={{
              hidden: { opacity: 0, y: -8 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
            }}
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="font-sans font-medium text-white transition-all duration-200 hover:opacity-90"
              style={{
                fontSize: 15,
                backgroundColor: "#3B6B4F",
                borderRadius: 100,
                padding: "10px 24px",
              }}
            >
              Get in touch
            </button>
          </motion.li>
        </motion.ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex md:hidden h-10 w-10 items-center justify-center text-ink"
          aria-label="Toggle menu"
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
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ backgroundColor: "#F5F0EB", borderBottom: "0.5px solid #DDD8D2" }}
          >
            <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
              {NAV_LINKS.map(({ href, label }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06 }}
                >
                  <button
                    onClick={() => scrollTo(href)}
                    className="block w-full text-left py-3 px-3 font-sans rounded-lg transition-colors hover:bg-sage-light"
                    style={{ fontSize: 17, color: "#3E3935" }}
                  >
                    {label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + NAV_LINKS.length * 0.06 }}
              >
                <button
                  onClick={() => scrollTo("#contact")}
                  className="mt-2 w-full font-sans font-medium text-white text-center py-3 rounded-full transition-opacity hover:opacity-90"
                  style={{ fontSize: 16, backgroundColor: "#3B6B4F" }}
                >
                  Get in touch
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
