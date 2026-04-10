export default function Footer() {
  return (
    <footer className="border-t border-divider bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:bhautikpatel0015@gmail.com"
              className="text-[13px] text-muted hover:text-sage transition-colors duration-200 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              bhautikpatel0015@gmail.com
            </a>

            <a
              href="https://linkedin.com/in/bhautikpatel0015"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-muted hover:text-sage transition-colors duration-200 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[12px] text-muted/60">
            © {new Date().getFullYear()} Bhautik Patel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
