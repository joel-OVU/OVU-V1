import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// Mock IntersectionObserver which is used by motion's whileInView
class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  constructor(
    private callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {
    // Immediately invoke callback with all entries as intersecting
    setTimeout(() => {
      this.callback(
        [{ isIntersecting: true, intersectionRatio: 1 }] as IntersectionObserverEntry[],
        this as unknown as IntersectionObserver
      );
    }, 0);
  }

  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

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
