import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// New board-game themed components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import ProjectsSection from "./components/Projects";
import ContactSection from "./components/Contact";
import BoardFooter from "./components/BoardFooter";
import PageLoader from "./components/PageLoader";

// Pages
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import CaseStudy from "./pages/CaseStudy";

// Admin
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import ProjectForm from "./admin/ProjectForm";
import ResumeEditor from "./admin/ResumeEditor";

// Seed scripts — attach to window in dev mode
import "./lib/seedResume";

/* ── Page transition wrapper ── */
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ── Home page with all board-game themed sections ── */
function HomePage() {
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F9F7F3" }}
      {...pageTransition}
    >
      <Navbar />
      <main className="flex-1" style={{ paddingTop: 64 }}>
        <Hero />
        <AboutSection />
        <Skills />
        <Experience />
        <ProjectsSection />
        <ContactSection />
      </main>
      <BoardFooter />
    </motion.div>
  );
}

/* ── Animated Routes ── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home — new board-game themed layout */}
        <Route path="/" element={<HomePage />} />

        {/* Case study pages — board-game themed */}
        <Route path="/case-study/:slug" element={<CaseStudy />} />

        {/* Other public routes wrapped in original Layout (Navbar + Footer) */}
        <Route element={<Layout />}>
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Admin login — outside Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin routes — outside Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route path="/admin/projects/:id" element={<ProjectForm />} />
          <Route path="/admin/resume" element={<ResumeEditor />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLoader />
        <AnimatedRoutes />

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111110",
              color: "#F9F8F6",
              border: "1px solid #E5E4E0",
              borderRadius: "0.5rem",
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "0.8rem",
            },
            success: {
              style: {
                background: "#111110",
                color: "#fff",
                borderRadius: "0.5rem",
              },
            },
            error: {
              style: {
                background: "#FEF2F2",
                color: "#DC2626",
                border: "1px solid #FECACA",
                borderRadius: "0.5rem",
              },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
