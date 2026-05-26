import { useEffect, useRef, useState } from "react";

/**
 * Custom interactive cursor with three states:
 * - default: small filled dot + larger trailing ring
 * - moving: ring stretches/scales while pointer is in motion
 * - hover: ring expands and fills when over interactive elements
 */
export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [moving, setMoving] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pos.x, y: pos.y };
    let raf = 0;
    let moveTimer: number | undefined;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!visible) setVisible(true);

      // Hover detection
      const el = e.target as HTMLElement | null;
      const isInteractive = !!el?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );
      setHovering(isInteractive);

      setMoving(true);
      if (moveTimer) window.clearTimeout(moveTimer);
      moveTimer = window.setTimeout(() => setMoving(false), 90);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const tick = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      // Ring lerps for trailing effect
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    document.body.style.cursor = "none";

    return () => {
      cancelAnimationFrame(raf);
      if (moveTimer) window.clearTimeout(moveTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.body.style.cursor = "";
    };
  }, [visible]);

  return (
    <>
      <style>{`
        @media (pointer: coarse) { .ic-root { display: none !important; } }
        a, button, [role="button"], input, textarea, select, label { cursor: none; }
      `}</style>

      <div
        ref={dotRef}
        className="ic-root pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary transition-[opacity,width,height] duration-200"
        style={{
          opacity: visible ? 1 : 0,
          width: hovering ? "0.4rem" : clicking ? "0.6rem" : "0.5rem",
          height: hovering ? "0.4rem" : clicking ? "0.6rem" : "0.5rem",
          boxShadow: "0 0 12px oklch(0.62 0.22 25 / 0.9)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        className="ic-root pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
      >
        <div
          ref={ringInnerRef}
          className="rounded-full border transition-all duration-200 ease-out"
          style={{
            width: hovering ? "3rem" : clicking ? "1.5rem" : "2.25rem",
            height: hovering ? "3rem" : clicking ? "1.5rem" : "2.25rem",
            marginLeft: hovering ? "-1.5rem" : clicking ? "-0.75rem" : "-1.125rem",
            marginTop: hovering ? "-1.5rem" : clicking ? "-0.75rem" : "-1.125rem",
            backgroundColor: hovering
              ? "oklch(0.62 0.22 25 / 0.15)"
              : "transparent",
            borderColor: "oklch(0.62 0.22 25 / 0.7)",
            boxShadow: hovering
              ? "0 0 30px oklch(0.62 0.22 25 / 0.55)"
              : "0 0 16px oklch(0.62 0.22 25 / 0.25)",
            transform: moving && !hovering ? "scale(1.15)" : "scale(1)",
          }}
        />
      </div>

    </>
  );
}
