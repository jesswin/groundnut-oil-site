"use client";

import { inView, useAnimate } from "framer-motion";
import { useEffect } from "react";

/**
 * Subtle fade-and-rise when a block scrolls into view.
 * The block is rendered visible, and is only hidden (then animated in) by script when it
 * starts below the fold. So content never depends on JavaScript, and nothing moves for
 * visitors who prefer reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();

  useEffect(() => {
    const el = scope.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;

    animate(el, { opacity: 0, transform: "translateY(18px)" }, { duration: 0 });
    return inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], transform: ["translateY(18px)", "translateY(0px)"] },
          { duration: 0.5, ease: "easeOut", delay },
        );
      },
      { margin: "0px 0px -60px 0px" },
    );
  }, [scope, animate, delay]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
