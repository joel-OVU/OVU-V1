/**
 * __mocks__/motion-react.tsx
 *
 * Manual mock for the `motion/react` package used by Vitest.
 *
 * WHY THIS EXISTS:
 * Framer Motion uses browser APIs (IntersectionObserver, ResizeObserver,
 * layout measurement) that don't exist in headless test environments like
 * happy-dom. When real motion components mount in tests, they start polling
 * for scroll position and layout changes in an infinite loop, permanently
 * hanging the Vitest process.
 *
 * HOW THE MOCK WORKS:
 * Every `motion.div`, `motion.section`, etc. is replaced with a plain React
 * component that just renders its children — stripping all animations. This
 * means tests verify structure and behaviour, not animation values, which is
 * exactly what unit tests should do.
 */
import React from "react";
import { vi } from "vitest";

// --- Types ---
type AnyProps = Record<string, unknown>;

/**
 * Creates a pass-through component for a given HTML tag.
 * It forwards all standard HTML props but drops motion-specific ones
 * (initial, animate, exit, transition, variants, whileInView, etc.)
 * so React doesn't warn about unknown DOM attributes.
 */
function createMotionComponent(tag: keyof React.JSX.IntrinsicElements) {
  const motionProps = new Set([
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
    "viewport",
    "layout",
    "layoutId",
    "drag",
    "dragConstraints",
    "dragElastic",
    "dragMomentum",
    "onAnimationComplete",
    "onAnimationStart",
    "onUpdate",
    "onViewportEnter",
    "onViewportLeave",
    "style",           // keep — may be valid; but framer passes MotionValues here
  ]);

  const PassThrough = React.forwardRef<HTMLElement, AnyProps>(
    ({ children, style, ...rest }, ref) => {
      // Strip motion-specific props to avoid React unknown-prop warnings
      const domProps: AnyProps = {};
      for (const [key, val] of Object.entries(rest)) {
        if (!motionProps.has(key)) {
          domProps[key] = val;
        }
      }

      // `style` from Framer may contain MotionValues (not plain CSS).
      // We only pass through plain objects to avoid errors.
      const safeStyle =
        style && typeof style === "object" && !("get" in style)
          ? (style as React.CSSProperties)
          : undefined;

      return React.createElement(tag, { ...domProps, ref, style: safeStyle }, children);
    }
  );

  PassThrough.displayName = `motion.${tag}`;
  return PassThrough;
}

// Build `motion` proxy covering every common HTML element
const HTML_TAGS = [
  "a", "article", "aside", "button", "div", "footer", "form",
  "h1", "h2", "h3", "h4", "h5", "h6", "header", "img", "input",
  "label", "li", "main", "nav", "ol", "p", "section", "span",
  "table", "tbody", "td", "th", "thead", "tr", "ul",
] as const;

type MotionProxy = {
  [K in (typeof HTML_TAGS)[number]]: ReturnType<typeof createMotionComponent>;
};

export const motion = HTML_TAGS.reduce((acc, tag) => {
  acc[tag] = createMotionComponent(tag);
  return acc;
}, {} as MotionProxy);

/**
 * AnimatePresence — just renders children directly.
 * In real Framer Motion it manages mount/unmount animations.
 * In tests, we just want children to appear/disappear immediately.
 */
export const AnimatePresence: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  React.createElement(React.Fragment, null, children);

/**
 * useScroll — returns dummy MotionValue-like objects.
 * Components using `useScroll` expect an object with a `scrollYProgress`
 * property. We return a mock that has a `get()` method returning 0.
 */
export const useScroll = vi.fn(() => ({
  scrollY: { get: () => 0, onChange: vi.fn() },
  scrollYProgress: { get: () => 0, onChange: vi.fn() },
  scrollX: { get: () => 0, onChange: vi.fn() },
  scrollXProgress: { get: () => 0, onChange: vi.fn() },
}));

/**
 * useTransform — returns a stub MotionValue.
 * In real Framer Motion, this maps one MotionValue to another through
 * a range of values. In tests, returning 1 (the identity) is safe
 * since it's only used for style calculations (opacity, scale, etc.)
 */
export const useTransform = vi.fn(() => ({
  get: () => 1,
  onChange: vi.fn(),
}));

// Re-export anything else components might import from motion/react
export const useMotionValue = vi.fn(() => ({ get: () => 0, set: vi.fn(), onChange: vi.fn() }));
export const useSpring = vi.fn(() => ({ get: () => 0, set: vi.fn(), onChange: vi.fn() }));
export const useAnimate = vi.fn(() => [vi.fn(), { current: null }]);
export const useAnimation = vi.fn(() => ({ start: vi.fn(), stop: vi.fn(), set: vi.fn() }));
export const useInView = vi.fn(() => false);
export const useReducedMotion = vi.fn(() => true);
export const LayoutGroup: React.FC<{ children?: React.ReactNode }> = ({ children }) =>
  React.createElement(React.Fragment, null, children);
