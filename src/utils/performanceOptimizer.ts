// Utility para otimizar performance e reduzir forced reflows

export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private resizeObserver: ResizeObserver | null = null;
  private intersectionObserver: IntersectionObserver | null = null;
  private rafCallbacks: Set<() => void> = new Set();
  private rafScheduled = false;

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Debounce function para evitar múltiplas execuções
  debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    }) as T;
  }

  // Throttle function para limitar execuções por tempo
  throttle<T extends (...args: any[]) => void>(func: T, limit: number): T {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }

  // Schedule operations for next animation frame
  scheduleRAF(callback: () => void): void {
    this.rafCallbacks.add(callback);
    if (!this.rafScheduled) {
      this.rafScheduled = true;
      requestAnimationFrame(() => {
        const callbacks = Array.from(this.rafCallbacks);
        this.rafCallbacks.clear();
        this.rafScheduled = false;
        callbacks.forEach(cb => cb());
      });
    }
  }

  // Batch DOM reads and writes to reduce forced reflow
  batchDOMOperations(reads: (() => void)[], writes: (() => void)[]): void {
    this.scheduleRAF(() => {
      // Execute all reads first
      reads.forEach(read => read());
      
      // Then execute all writes in next frame
      this.scheduleRAF(() => {
        writes.forEach(write => write());
      });
    });
  }

  // Cache geometric values to avoid forced reflow
  private geometryCache = new Map<string, { value: number; timestamp: number }>();
  private readonly CACHE_DURATION = 100; // 100ms cache

  getCachedGeometry(key: string, getValue: () => number): number {
    const now = performance.now();
    const cached = this.geometryCache.get(key);
    
    if (cached && (now - cached.timestamp) < this.CACHE_DURATION) {
      return cached.value;
    }
    
    const value = getValue();
    this.geometryCache.set(key, { value, timestamp: now });
    return value;
  }

  // Optimized scroll position getter
  getScrollPosition(): { x: number; y: number } {
    return {
      x: this.getCachedGeometry('scrollX', () => window.scrollX || window.pageXOffset),
      y: this.getCachedGeometry('scrollY', () => window.scrollY || window.pageYOffset)
    };
  }

  // Optimized element dimensions getter
  getElementDimensions(element: Element): { width: number; height: number } {
    const key = `${element.tagName}_${element.className}`;
    return {
      width: this.getCachedGeometry(`${key}_width`, () => element.clientWidth),
      height: this.getCachedGeometry(`${key}_height`, () => element.clientHeight)
    };
  }

  // Optimized viewport dimensions
  getViewportDimensions(): { width: number; height: number } {
    return {
      width: this.getCachedGeometry('viewportWidth', () => window.innerWidth),
      height: this.getCachedGeometry('viewportHeight', () => window.innerHeight)
    };
  }

  // Clear cache (useful for resize events)
  clearCache(): void {
    this.geometryCache.clear();
  }

  // Cleanup method
  destroy(): void {
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    this.rafCallbacks.clear();
    this.geometryCache.clear();
  }
}

export const performanceOptimizer = PerformanceOptimizer.getInstance();