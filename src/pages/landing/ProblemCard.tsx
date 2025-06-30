import React, { useEffect, useState, useRef } from "react";

export default function ProblemCard() {
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [scrollYWhenInView, setScrollYWhenInView] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        const wasInView = isInView;
        const nowInView = entry.isIntersecting;
        
        setIsInView(nowInView);
        
        // Store the scroll position when element first enters view
        if (!wasInView && nowInView) {
          setScrollYWhenInView(scrollY);
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
  }, [isInView, scrollY]);

  // Calculate parallax transform - small effect that moves slightly faster than scroll
  const parallaxY = isInView ? (scrollY - scrollYWhenInView) * 0.1 : 0;

  return (
    <div 
      ref={wrapperRef}
      className="h-screen flex flex-col items-center justify-space-around gap-32 px-8 md:px-32"
      style={{
        transform: `translateY(${parallaxY}px)`,
        willChange: 'transform',
      }}
    >
      <p className="font-light problem-text text-xl"></p>
      <p className="problem-statement">
        Social Media is a <span className="text-red-error">broken</span> time
        trap and is no longer designed around authentic connections
      </p>
      <p className="problem-statement">
        Its also hard to consistently meet your goals on time, form new habits,
        and stay organized
      </p>
      <p className="problem-statement">
      kindred is here to address that and shape a new model of productivity</p>
    </div>
  )
}
