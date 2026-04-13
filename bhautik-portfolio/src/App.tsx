import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";

import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import HomePage from "./pages/HomePage";

/* Lazy-load case study pages — they're 500-900 lines each and only visited on click */
const GiftSensePage = lazy(() => import("./pages/GiftSensePage"));
const StockSagePage = lazy(() => import("./pages/StockSagePage"));
const RiskReportingPage = lazy(() => import("./pages/RiskReportingPage"));
const ChatGPTVoicePage = lazy(() => import("./pages/ChatGPTVoicePage"));
const AddivityPage = lazy(() => import("./pages/AddivityPage"));

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 0.03, 0.26, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Give the new page a tick to render before scrolling to the target.
      const id = hash.replace("#", "");
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      const t = window.setTimeout(tryScroll, 80);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-6 text-center" style={{ minHeight: "80vh" }}>
      <h1 className="font-display" style={{ fontSize: 48, color: "#1A1A1A", marginBottom: 12 }}>404</h1>
      <p className="font-sans" style={{ fontSize: 18, color: "#3E3935", marginBottom: 32 }}>
        This page doesn't exist.
      </p>
      <Link
        to="/"
        className="font-sans font-medium text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#3B6B4F", borderRadius: 100, padding: "12px 28px", fontSize: 15, textDecoration: "none" }}
      >
        Back to home
      </Link>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/giftsense" element={<GiftSensePage />} />
            <Route path="/projects/stocksage" element={<StockSagePage />} />
            <Route path="/projects/risk-reporting" element={<RiskReportingPage />} />
            <Route path="/projects/chatgpt-voice" element={<ChatGPTVoicePage />} />
            <Route path="/projects/addivity" element={<AddivityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-cream">
        <Navbar />
        <ScrollToTop />
        <AnimatedRoutes />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
