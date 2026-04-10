import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { SOCIAL_LINKS } from "../config/site";

/* ── Animation variants ── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.03, 0.26, 1] },
  },
};

/* ── Form state ── */
interface FormData {
  name: string;
  email: string;
  message: string;
}

const INITIAL: FormData = { name: "", email: "", message: "" };

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState<FormData>(INITIAL);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setSending(true);
    setError("");
    try {
      await addDoc(collection(db, "contact_messages"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try emailing me directly.");
    } finally {
      setSending(false);
    }
  };

  /* Shared input styles */
  const inputStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: '"Inter", system-ui, sans-serif',
    fontSize: 14,
    padding: "12px 14px",
    borderRadius: 6,
    border: "1px solid #E5E2D9",
    backgroundColor: "#FFFFFF",
    color: "#1A1A18",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #E5E2D9",
        padding: "80px 24px",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        style={{ maxWidth: 560, margin: "0 auto" }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#3B6D11",
            margin: "0 0 12px 0",
            textAlign: "center",
          }}
        >
          Contact
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          className="font-display"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#1A1A18",
            margin: "0 0 10px 0",
            textAlign: "center",
          }}
        >
          Make Your Move
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: "#6B7280",
            margin: "0 0 40px 0",
            textAlign: "center",
          }}
        >
          Whether it's a role, a collab, or just good PM talk — I'm in.
        </motion.p>

        {/* Form or success message */}
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              textAlign: "center",
              padding: "48px 24px",
              backgroundColor: "rgba(59, 109, 17, 0.04)",
              borderRadius: 12,
              border: "1px solid #E5E2D9",
            }}
          >
            <p
              style={{ fontSize: 28, marginBottom: 16, lineHeight: 1 }}
            >
              ✓
            </p>
            <p
              className="font-display"
              style={{
                fontSize: 22,
                color: "#1A1A18",
                margin: "0 0 8px 0",
              }}
            >
              Message received.
            </p>
            <p
              className="font-sans"
              style={{
                fontSize: 14,
                color: "#6B7280",
                margin: 0,
              }}
            >
              I'll respond within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeUp}
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="contact-name"
                className="font-sans"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#1A1A18",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="contact-email"
                className="font-sans"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#1A1A18",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="contact-message"
                className="font-sans"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#1A1A18",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="What's on your mind?"
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Error */}
            {error && (
              <p
                className="font-sans"
                style={{ fontSize: 13, color: "#DC2626", margin: 0 }}
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={sending}
              className="font-sans"
              style={{
                fontSize: 14,
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 6,
                backgroundColor: sending ? "#6B7280" : "#3B6D11",
                color: "#FFFFFF",
                border: "none",
                cursor: sending ? "not-allowed" : "pointer",
                transition: "all 150ms ease",
                minHeight: 44,
              }}
              onMouseEnter={(e) => {
                if (!sending) {
                  e.currentTarget.style.backgroundColor = "#2F5A0D";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!sending) {
                  e.currentTarget.style.backgroundColor = "#3B6D11";
                  e.currentTarget.style.transform = "";
                }
              }}
            >
              {sending ? "Sending..." : "Send It →"}
            </button>
          </motion.form>
        )}

        {/* Social links row */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
            marginTop: 40,
            paddingTop: 32,
            borderTop: "1px solid #E5E2D9",
          }}
        >
          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "#6B7280",
              textDecoration: "none",
              transition: "color 0.15s",
              minHeight: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3B6D11";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>

          {/* Email */}
          <a
            href={SOCIAL_LINKS.email}
            aria-label="Email"
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "#6B7280",
              textDecoration: "none",
              transition: "color 0.15s",
              minHeight: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3B6D11";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Email
          </a>

          {/* GitHub */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="font-sans"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              color: "#6B7280",
              textDecoration: "none",
              transition: "color 0.15s",
              minHeight: "auto",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3B6D11";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#6B7280";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>
        </motion.div>

        {/* Direct email fallback */}
        <motion.p
          variants={fadeUp}
          className="font-sans"
          style={{
            fontSize: 12,
            color: "#6B7280",
            textAlign: "center",
            marginTop: 16,
          }}
        >
          Or email me directly at{" "}
          <a
            href={SOCIAL_LINKS.email}
            style={{
              color: "#3B6D11",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            hello@bhautikpatel.com
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
