// Web Vitals monitoring
export const reportWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP observer not supported');
    }
  }

  // First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingDuration);
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('FID observer not supported');
    }
  }

  // Cumulative Layout Shift (CLS)
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('CLS:', entry.value);
        });
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS observer not supported');
    }
  }
};

// Prefetch routes for faster navigation
export const prefetchRoute = (route: string) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = route;
  document.head.appendChild(link);
};

// Preload critical images
export const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};
