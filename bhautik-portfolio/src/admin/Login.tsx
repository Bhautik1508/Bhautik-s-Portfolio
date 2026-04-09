import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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

/* ── Component ── */

export default function AdminLogin() {
  const { login, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* Redirect if already authenticated as admin */
  useEffect(() => {
    if (!authLoading && isAdmin) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [authLoading, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9F8F6",
        padding: "24px",
      }}
    >
      {/* ── Login card ── */}
      <form
        onSubmit={handleSubmit}
        data-testid="login-form"
        style={{
          width: 360,
          maxWidth: "100%",
          backgroundColor: "#fff",
          border: "1px solid #E5E4E0",
          borderRadius: 14,
          padding: "36px 32px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── Card header ── */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p
            style={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: 18,
              color: "#111110",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Bhautik Patel
          </p>
          <p
            style={inter(11, 500, "#6B7280", {
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginTop: 4,
            })}
          >
            Command Centre
          </p>
          <hr
            style={{
              border: "none",
              borderTop: "1px solid #E5E4E0",
              margin: "16px 0 0 0",
            }}
          />
        </div>

        {/* ── Form fields ── */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={inter(11, 500, "#3D3D3A", {
                display: "block",
                marginBottom: 4,
              })}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="login-input"
              style={{
                width: "100%",
                border: "1px solid #E5E4E0",
                borderRadius: 6,
                padding: "9px 12px",
                ...inter(13, 400, "#111110"),
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={inter(11, 500, "#3D3D3A", {
                display: "block",
                marginBottom: 4,
              })}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="login-input"
              style={{
                width: "100%",
                border: "1px solid #E5E4E0",
                borderRadius: 6,
                padding: "9px 12px",
                ...inter(13, 400, "#111110"),
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
              }}
            />
          </div>

          {/* Error message */}
          {error && (
            <div
              data-testid="login-error"
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: 6,
                padding: "8px 12px",
                ...inter(12, 400, "#DC2626"),
              }}
            >
              {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="login-submit"
            style={{
              width: "100%",
              marginTop: 4,
              backgroundColor: "#2D6A4F",
              color: "#fff",
              ...inter(13, 500, "#fff"),
              padding: 10,
              borderRadius: 6,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "background-color 0.15s, opacity 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            {loading ? (
              <>
                <span
                  className="login-spinner"
                  aria-hidden="true"
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                Signing in...
              </>
            ) : (
              "Sign In →"
            )}
          </button>
        </div>
      </form>

      {/* ── Back link ── */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        data-testid="back-link"
        className="login-back-link"
        style={inter(12, 400, "#6B7280", {
          marginTop: 16,
          textDecoration: "none",
          transition: "color 0.15s",
        })}
      >
        ← Back to portfolio
      </a>

      {/* ── CSS: focus states, hover, spinner ── */}
      <style>{`
        .login-input:focus {
          border-color: #2D6A4F !important;
        }
        .login-submit:hover:not(:disabled) {
          background-color: #245A41 !important;
        }
        .login-back-link:hover {
          color: #111110 !important;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .login-spinner {
          animation: spin 0.6s linear infinite;
        }
      `}</style>
    </div>
  );
}
