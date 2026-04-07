import "@testing-library/jest-dom/vitest";

// ---------- Mock: framer-motion ----------
// Replace all framer-motion components with plain DOM equivalents so tests
// don't depend on animation internals.
vi.mock("framer-motion", () => {
  const actual = vi.importActual("framer-motion");
  return {
    ...actual,
    motion: new Proxy(
      {},
      {
        get: (_target, prop: string) => {
          // Return a forwardRef passthrough for every HTML tag
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return ({ children, ...rest }: any) => {
            // Strip framer-specific props
            const {
              initial: _i,
              animate: _a,
              exit: _e,
              transition: _t,
              variants: _v,
              whileInView: _wiv,
              viewport: _vp,
              layoutId: _lid,
              custom: _c,
              ...htmlProps
            } = rest;
            const Tag = prop as keyof JSX.IntrinsicElements;
            return <Tag {...htmlProps}>{children}</Tag>;
          };
        },
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useInView: () => true,
  };
});

// ---------- Mock: firebase ----------
vi.mock("../lib/firebase", () => ({
  auth: {},
  db: {},
  default: {},
}));

// ---------- Mock: firebase/auth ----------
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((_auth, cb) => {
    // Simulate unauthenticated state immediately
    cb(null);
    return vi.fn(); // unsubscribe
  }),
  signInWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));

// ---------- Mock: firebase/firestore ----------
vi.mock("firebase/firestore", () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  onSnapshot: vi.fn((_query: unknown, _onNext: unknown, _onError?: unknown) => {
    // Default: no-op. Individual tests override via vi.mocked().
    return vi.fn(); // unsubscribe
  }),
  getDocs: vi.fn(() => Promise.resolve({ empty: true, docs: [] })),
  getDoc: vi.fn(() => Promise.resolve({ exists: () => false, data: () => null })),
  addDoc: vi.fn(() => Promise.resolve({ id: "mock-id" })),
  updateDoc: vi.fn(() => Promise.resolve()),
  deleteDoc: vi.fn(() => Promise.resolve()),
  doc: vi.fn(),
  serverTimestamp: vi.fn(() => "mock-timestamp"),
}));

// ---------- Mock: firebase/app ----------
vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));
