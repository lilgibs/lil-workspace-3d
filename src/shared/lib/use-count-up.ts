"use client";

import { useEffect, useRef, useState } from "react";

// Animates a number toward `target` so price changes read as motion, not a jump.
export function useCountUp(target: number, { duration = 500, step = 1 } = {}) {
  const [value, setValue] = useState(target);
  const current = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { current.current = target; setValue(target); return; }
    const origin = current.current;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      current.current = t < 1 ? Math.round((origin + (target - origin) * eased) / step) * step : target;
      setValue(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [target, duration, step]);
  return value;
}
