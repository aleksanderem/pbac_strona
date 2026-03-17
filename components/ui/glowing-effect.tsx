"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Lightweight animate replacement — cubic ease-out interpolation via rAF.
 * Replaces the motion/react `animate` function.
 */
function animateValue(
  from: number,
  to: number,
  durationSec: number,
  onUpdate: (value: number) => void
) {
  const start = performance.now();
  const dur = durationSec * 1000;
  const update = (now: number) => {
    const t = Math.min((now - start) / dur, 1);
    // Cubic ease-out approximation for [0.16, 1, 0.3, 1]
    const eased = 1 - Math.pow(1 - t, 3);
    onUpdate(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

/**
 * Shared coordinator for all GlowingEffect instances.
 * Instead of each instance independently calling getBoundingClientRect()
 * on every mouse move (causing N forced reflows), we batch all reads
 * into a single rAF tick: one reflow for all instances.
 */
const glowInstances = new Set<{
  element: HTMLDivElement;
  update: (rect: DOMRect, mouseX: number, mouseY: number) => void;
}>();

let sharedRAF = 0;
let lastMouse = { x: 0, y: 0 };

function scheduleSharedUpdate(e?: { x: number; y: number }) {
  if (e) {
    lastMouse = { x: e.x, y: e.y };
  }

  if (sharedRAF) return; // already scheduled

  sharedRAF = requestAnimationFrame(() => {
    sharedRAF = 0;
    const { x: mouseX, y: mouseY } = lastMouse;

    // Single read phase: batch all getBoundingClientRect calls
    const entries: Array<{
      rect: DOMRect;
      update: (rect: DOMRect, mouseX: number, mouseY: number) => void;
    }> = [];

    for (const inst of glowInstances) {
      entries.push({ rect: inst.element.getBoundingClientRect(), update: inst.update });
    }

    // Write phase: apply all style updates
    for (const entry of entries) {
      entry.update(entry.rect, mouseX, mouseY);
    }
  });
}

let listenerCount = 0;

function addSharedListeners() {
  listenerCount++;
  if (listenerCount === 1) {
    window.addEventListener("scroll", handleSharedScroll, { passive: true });
    document.body.addEventListener("pointermove", handleSharedPointerMove, { passive: true });
  }
}

function removeSharedListeners() {
  listenerCount--;
  if (listenerCount === 0) {
    window.removeEventListener("scroll", handleSharedScroll);
    document.body.removeEventListener("pointermove", handleSharedPointerMove);
    if (sharedRAF) {
      cancelAnimationFrame(sharedRAF);
      sharedRAF = 0;
    }
  }
}

function handleSharedScroll() {
  scheduleSharedUpdate();
}

function handleSharedPointerMove(e: PointerEvent) {
  scheduleSharedUpdate(e);
}

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}
const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isVisibleRef = useRef(false);

    // The write-only update function: receives a pre-read rect, no layout reads
    const updateGlow = useCallback(
      (rect: DOMRect, mouseX: number, mouseY: number) => {
        const element = containerRef.current;
        if (!element || !isVisibleRef.current) return;

        const { left, top, width, height } = rect;
        const center = [left + width * 0.5, top + height * 0.5];
        const distanceFromCenter = Math.hypot(
          mouseX - center[0],
          mouseY - center[1]
        );
        const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

        if (distanceFromCenter < inactiveRadius) {
          element.style.setProperty("--active", "0");
          return;
        }

        const isActive =
          mouseX > left - proximity &&
          mouseX < left + width + proximity &&
          mouseY > top - proximity &&
          mouseY < top + height + proximity;

        element.style.setProperty("--active", isActive ? "1" : "0");

        if (!isActive) return;

        const currentAngle =
          parseFloat(element.style.getPropertyValue("--start")) || 0;
        const targetAngle =
          (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
            Math.PI +
          90;

        const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
        const newAngle = currentAngle + angleDiff;

        animateValue(currentAngle, newAngle, movementDuration, (value) => {
          element.style.setProperty("--start", String(value));
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;
      const element = containerRef.current;
      if (!element) return;

      const instance = { element, update: updateGlow };

      // Use IntersectionObserver to only process visible instances
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            glowInstances.add(instance);
          } else {
            glowInstances.delete(instance);
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(element);

      addSharedListeners();

      return () => {
        observer.disconnect();
        glowInstances.delete(instance);
        removeSharedListeners();
      };
    }, [updateGlow, disabled]);

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />
        <div
          ref={containerRef}
          style={
            {
              "--blur": `${blur}px`,
              "--spread": spread,
              "--start": "0",
              "--active": "0",
              "--glowingeffect-border-width": `${borderWidth}px`,
              "--repeating-conic-gradient-times": "5",
              "--gradient":
                variant === "white"
                  ? `repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  var(--black),
                  var(--black) calc(25% / var(--repeating-conic-gradient-times))
                )`
                  : `radial-gradient(circle, #B31853 10%, #B3185300 20%),
                radial-gradient(circle at 40% 40%, #3D5EFF 5%, #3D5EFF00 15%),
                radial-gradient(circle at 60% 60%, #DF396F 10%, #DF396F00 20%),
                radial-gradient(circle at 40% 60%, #1A337F 10%, #1A337F00 20%),
                repeating-conic-gradient(
                  from 236.84deg at 50% 50%,
                  #B31853 0%,
                  #3D5EFF calc(25% / var(--repeating-conic-gradient-times)),
                  #DF396F calc(50% / var(--repeating-conic-gradient-times)),
                  #1A337F calc(75% / var(--repeating-conic-gradient-times)),
                  #B31853 calc(100% / var(--repeating-conic-gradient-times))
                )`,
            } as React.CSSProperties
          }
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
