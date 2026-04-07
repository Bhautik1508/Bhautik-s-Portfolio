import { useState, useEffect } from "react";

/**
 * Animate an integer from 0 → target over `duration` ms with ease-out-quad.
 * @param target  Final value to count up to
 * @param duration  Animation duration in ms (default 600)
 * @param startOnMount  Whether to start counting immediately (default true)
 */
export function useCountUp(
  target: number,
  duration = 600,
  startOnMount = true
): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!startOnMount) return;

    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - t) * (1 - t);
      setCurrent(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, startOnMount]);

  return current;
}
