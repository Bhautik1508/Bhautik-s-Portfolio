import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";

// Admin
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import ProjectForm from "./admin/ProjectForm";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes wrapped in Layout (Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
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
          </Route>
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111110",
              color: "#F9F8F6",
              border: "1px solid #E5E4E0",
              borderRadius: "0.5rem",
              fontFamily: '"Inter", system-ui, sans-serif',
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
