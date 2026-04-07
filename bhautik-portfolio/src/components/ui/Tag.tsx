import { type ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-accent-light text-accent px-2 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}
