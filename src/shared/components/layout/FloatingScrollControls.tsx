import React, { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

export const FloatingScrollControls: React.FC = () => {
  const [showUp, setShowUp] = useState(false);
  const [showDown, setShowDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Show UP button after scrolling past threshold
      setShowUp(scrollY > 280);

      // Show DOWN button if document is long enough and not yet near the bottom
      const isLongDocument = fullHeight > windowHeight + 350;
      const isNearBottom = scrollY + windowHeight >= fullHeight - 200;
      setShowDown(isLongDocument && !isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  if (!showUp && !showDown) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-2 animate-fade-in pointer-events-none"
      aria-label="Scroll controls"
    >
      {/* Scroll to Top */}
      {showUp && (
        <button
          type="button"
          onClick={scrollToTop}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-surface/90 text-text-secondary backdrop-blur-md shadow-card hover:bg-surface-secondary hover:text-accent hover:border-accent/40 transition-all active:scale-95 cursor-pointer"
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      {/* Scroll to Bottom */}
      {showDown && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-xl border border-border-subtle bg-surface/90 text-text-secondary backdrop-blur-md shadow-card hover:bg-surface-secondary hover:text-accent hover:border-accent/40 transition-all active:scale-95 cursor-pointer"
          aria-label="Scroll to bottom"
          title="Scroll to bottom"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
