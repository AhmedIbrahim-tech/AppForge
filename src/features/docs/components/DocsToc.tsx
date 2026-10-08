import React, { useEffect, useState } from "react";
import type { DocTocItem } from "../types";
import { ListTree } from "lucide-react";

export interface DocsTocProps {
  items: DocTocItem[];
}

export const DocsToc: React.FC<DocsTocProps> = ({ items }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0.1,
      },
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-20 hidden xl:block w-56 shrink-0 py-2"
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold text-text-primary font-heading mb-3">
        <ListTree className="h-3.5 w-3.5 text-accent" />
        <span>On This Page</span>
      </div>
      <ul className="space-y-1.5 border-l border-border-subtle pl-3 text-xs">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                    history.replaceState(null, "", `#${item.id}`);
                    setActiveId(item.id);
                  }
                }}
                className={`block py-0.5 transition-colors font-sans ${
                  isActive
                    ? "font-semibold text-accent -ml-[13px] pl-3 border-l-2 border-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
