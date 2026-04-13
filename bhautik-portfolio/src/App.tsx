import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import HomePage from "./pages/HomePage";
import GiftSensePage from "./pages/GiftSensePage";
import StockSagePage from "./pages/StockSagePage";
import RiskReportingPage from "./pages/RiskReportingPage";
import ChatGPTVoicePage from "./pages/ChatGPTVoicePage";
import AddivityPage from "./pages/AddivityPage";

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
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/giftsense" element={<GiftSensePage />} />
          <Route path="/projects/stocksage" element={<StockSagePage />} />
          <Route path="/projects/risk-reporting" element={<RiskReportingPage />} />
          <Route path="/projects/chatgpt-voice" element={<ChatGPTVoicePage />} />
          <Route path="/projects/addivity" element={<AddivityPage />} />
        </Routes>
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
