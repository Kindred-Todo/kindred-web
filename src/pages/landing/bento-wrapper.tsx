import React, { useEffect, useState, useRef } from "react";
import { Bento } from "./bento";
import { BentoMobile } from "./bento-mobile";

export const BentoWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [scrollYWhenInView, setScrollYWhenInView] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInViewRef.current;
        const nowInView = entry.isIntersecting;
        
        isInViewRef.current = nowInView;
        setIsInView(nowInView);
        
        // Store the scroll position when element first enters view
        if (!wasInView && nowInView) {
          setScrollYWhenInView(window.scrollY);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start effect slightly before element enters view
      }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []); // Remove dependencies to prevent re-observing

  // Calculate parallax transform - moves faster than scroll, only when in view
  // Use the difference from when it entered view to avoid jumping
  const parallaxY = isInView ? (scrollY - scrollYWhenInView) * -0.3 : 0;

  return (
    <div 
      ref={wrapperRef}
      className="flex flex-col items-center justify-center w-full bg-dark-bg rounded-[32px] md:rounded-[64px] p-8 z-40 transform translate-y-[-5%]"
      style={{
        transform: `translateY(${-5 + parallaxY}px)`,
        willChange: 'transform',
      }}
    >
      {isMobile ? <BentoMobile /> : <Bento />}
    </div>
  );
};