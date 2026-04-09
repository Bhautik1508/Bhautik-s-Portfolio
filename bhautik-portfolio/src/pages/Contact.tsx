import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { OPEN_TO_WORK, SOCIAL_LINKS } from "../lib/config";
import { Badge } from "../components/ui";
import FadeUp from "../components/ui/FadeUp";

/* ── Style helpers ── */

const inter = (
  size: number,
  weight: number,
  color: string,
  extra?: React.CSSProperties
): React.CSSProperties => ({
  fontFamily: '"DM Sans", system-ui, sans-serif',
  fontSize: size,
  fontWeight: weight,
  color,
  margin: 0,
  ...extra,
});

/* ── Types ── */

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "Job Opportunity",
  message: "",
};

const SUBJECTS = [
  "Job Opportunity",
  "Collaboration",
  "Feedback on a Project",
  "Just Saying Hi",
];

/* ── Input base style ── */

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  border: "1px solid #E5E4E0",
  borderRadius: 6,
  padding: "9px 12px",
  ...inter(13, 400, "#111110"),
  backgroundColor: "#fff",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

/* ── Direct link row data ── */

const CONTACT_LINKS = [
  {
    icon: "in",
    label: "LinkedIn",
    sub: "linkedin.com/in/bhautik-patel",
    url: SOCIAL_LINKS.linkedin,
  },
  {
    icon: "⌥",
    label: "GitHub",
    sub: "github.com/Bhautik1508",
    url: SOCIAL_LINKS.github,
  },
  {
    icon: "✉",
    label: "Email",
    sub: "hello@bhautikpatel.com",
    url: SOCIAL_LINKS.email,
  },
  {
    icon: "📄",
    label: "Portfolio",
    sub: "nextleap.app/portfolio/bhautik-patel",
    url: SOCIAL_LINKS.portfolio,
  },
];

/* ── Component ── */

export default function Contact() {
  const [form, setForm] = useState<FormState>({ ...INITIAL_FORM });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Field updater ── */

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ── Validation ── */

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email";
    }
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  /* ── Submit ── */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSending(true);
    try {
      await addDoc(collection(db, "messages"), {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        createdAt: serverTimestamp(),
        read: false,
      });

      setSent(true);
      toast.success("Message sent! I'll get back to you soon.");

      // Reset after 3s
      resetTimerRef.current = setTimeout(() => {
        setForm({ ...INITIAL_FORM });
        setSent(false);
      }, 3000);
    } catch {
      toast.error("Something went wrong. Try emailing directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <section
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "72px 24px",
      }}
    >
      {/* ═══════ Header ═══════ */}
      <FadeUp delay={0}>
        <div style={{ marginBottom: 12 }}>
          <Badge variant="default">Send a Dispatch</Badge>
        </div>

        <h1
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: 40,
            color: "#111110",
            lineHeight: 1.15,
            margin: "0 0 10px 0",
          }}
        >
          Get in Touch
        </h1>

        <p
          style={inter(14, 400, "#6B7280", {
            lineHeight: 1.6,
            marginBottom: 36,
          })}
        >
          Open to PM roles, consulting, and strategic conversations.
        </p>
      </FadeUp>

      {/* ═══════ Two-column grid ═══════ */}
      <div
        className="contact-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 48,
        }}
      >
        {/* ── LEFT — Contact Form ── */}
        <FadeUp delay={0.1}>
          <form
            onSubmit={handleSubmit}
            data-testid="contact-form"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {/* 1. Name */}
            <div>
              <label
                htmlFor="name"
                style={inter(11, 500, "#3D3D3A", {
                  display: "block",
                  marginBottom: 4,
                })}
              >
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Priya Mehta"
                className="ct-input"
                style={INPUT_STYLE}
              />
              {errors.name && (
                <div
                  data-testid="error-name"
                  style={inter(11, 400, "#DC2626", { marginTop: 4 })}
                >
                  {errors.name}
                </div>
              )}
            </div>

            {/* 2. Email */}
            <div>
              <label
                htmlFor="email"
                style={inter(11, 500, "#3D3D3A", {
                  display: "block",
                  marginBottom: 4,
                })}
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="priya@company.com"
                className="ct-input"
                style={INPUT_STYLE}
              />
              {errors.email && (
                <div
                  data-testid="error-email"
                  style={inter(11, 400, "#DC2626", { marginTop: 4 })}
                >
                  {errors.email}
                </div>
              )}
            </div>

            {/* 3. Subject */}
            <div>
              <label
                htmlFor="subject"
                style={inter(11, 500, "#3D3D3A", {
                  display: "block",
                  marginBottom: 4,
                })}
              >
                Subject
              </label>
              <select
                id="subject"
                value={form.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className="ct-input"
                style={{ ...INPUT_STYLE, cursor: "pointer" }}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Message */}
            <div>
              <label
                htmlFor="message"
                style={inter(11, 500, "#3D3D3A", {
                  display: "block",
                  marginBottom: 4,
                })}
              >
                Message *
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                placeholder="Tell me what's on your mind..."
                maxLength={500}
                className="ct-input"
                style={{
                  ...INPUT_STYLE,
                  minHeight: 96,
                  resize: "vertical",
                }}
              />
              <div
                data-testid="char-counter"
                style={{
                  textAlign: "right",
                  ...inter(
                    10,
                    400,
                    form.message.length > 500 ? "#DC2626" : "#6B7280",
                    { marginTop: 4 }
                  ),
                }}
              >
                {form.message.length} / 500
              </div>
              {errors.message && (
                <div
                  data-testid="error-message"
                  style={inter(11, 400, "#DC2626", { marginTop: 4 })}
                >
                  {errors.message}
                </div>
              )}
            </div>

            {/* ── Form footer ── */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <span style={inter(10, 400, "#6B7280")}>
                Usually responds within 24 hours.
              </span>

              <button
                type="submit"
                disabled={sending || sent}
                data-testid="submit-btn"
                className={
                  sent ? "ct-sent-btn" : "ct-submit-btn"
                }
                style={{
                  ...inter(12, 500, "#fff"),
                  backgroundColor: sent ? "#22C55E" : "#2D6A4F",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: 6,
                  cursor: sending || sent ? "not-allowed" : "pointer",
                  opacity: sending ? 0.7 : 1,
                  transition:
                    "background-color 0.2s, opacity 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  minWidth: 140,
                  justifyContent: "center",
                }}
              >
                {sent ? (
                  "✓ Sent!"
                ) : sending ? (
                  <>
                    <span
                      className="ct-spinner"
                      aria-hidden="true"
                      style={{
                        width: 12,
                        height: 12,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  "Send Dispatch →"
                )}
              </button>
            </div>
          </form>
        </FadeUp>

        {/* ── RIGHT — Info Panel ── */}
        <FadeUp delay={0.2}>
          <div>
            {/* Availability badge */}
            {OPEN_TO_WORK && (
              <div
                data-testid="availability-badge"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#EAF3EE",
                  color: "#2D6A4F",
                  ...inter(11, 500, "#2D6A4F"),
                  padding: "5px 14px",
                  borderRadius: 999,
                  marginBottom: 20,
                }}
              >
                <span
                  className="ct-pulse-dot"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: "#2D6A4F",
                    display: "inline-block",
                  }}
                />
                Open to Opportunities
              </div>
            )}

            {/* Direct links panel */}
            <div
              data-testid="direct-links-panel"
              style={{
                backgroundColor: "#F9F8F6",
                border: "1px solid #E5E4E0",
                borderRadius: 12,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontFamily: '"DM Mono", "Courier New", monospace',
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#6B7280",
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 16,
                }}
              >
                Direct Links
              </div>

              {CONTACT_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-${link.label.toLowerCase()}`}
                  className="ct-link-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 0",
                    borderBottom:
                      idx < CONTACT_LINKS.length - 1
                        ? "1px solid #E5E4E0"
                        : "none",
                    textDecoration: "none",
                    transition: "color 0.15s",
                  }}
                >
                  {/* Left side */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    {/* Icon box */}
                    <div
                      className="ct-icon-box"
                      style={{
                        width: 32,
                        height: 32,
                        border: "1px solid #E5E4E0",
                        borderRadius: 6,
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        color: "#3D3D3A",
                        transition: "border-color 0.15s",
                        flexShrink: 0,
                      }}
                    >
                      {link.icon}
                    </div>

                    {/* Text stack */}
                    <div>
                      <div style={inter(12, 500, "#111110")}>
                        {link.label}
                      </div>
                      <div
                        style={inter(10, 400, "#6B7280", {
                          marginTop: 1,
                        })}
                      >
                        {link.sub}
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <span
                    className="ct-arrow"
                    style={inter(12, 400, "#6B7280", {
                      transition: "color 0.15s",
                    })}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── CSS ── */}
      <style>{`
        .ct-input:focus {
          border-color: #2D6A4F !important;
          box-shadow: 0 0 0 3px rgba(45,106,79,0.08) !important;
        }
        .ct-submit-btn:hover:not(:disabled) {
          background-color: #245A41 !important;
        }
        .ct-link-row:hover .ct-icon-box {
          border-color: #2D6A4F !important;
        }
        .ct-link-row:hover .ct-arrow {
          color: #2D6A4F !important;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .ct-spinner {
          animation: spin 0.6s linear infinite;
        }
        @keyframes ctPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
        .ct-pulse-dot {
          animation: ctPulse 1.8s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </section>
    </>
  );
}
