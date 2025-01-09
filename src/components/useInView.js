import { useEffect } from 'react';

export const useInView = (elementRef) => {
  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          console.log('Element is in view:', element);
          element.classList.add('in-view');
        } else {
          element.classList.remove('in-view');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check if element is already in view on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);
};
