import '@testing-library/jest-dom/vitest';
import { beforeEach, vi } from 'vitest';

// Existing suites predate the cookie banner — start each test with a stored
// decision so the banner stays out of the way. CookieConsent.test.tsx clears it.
beforeEach(() => {
  window.localStorage.setItem('site_cookie_consent', 'rejected');
});

// Mock IntersectionObserver which is used by motion's whileInView
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: MockResizeObserver,
});

if (typeof window.PointerEvent === 'undefined') {
  class PointerEvent extends Event {}
  Object.defineProperty(window, 'PointerEvent', {
    writable: true,
    value: PointerEvent,
  });
}

// Mock window.scrollTo
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
