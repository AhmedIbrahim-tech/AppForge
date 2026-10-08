import type { ReactNode } from "react";

export type BuilderTabItem<T extends string> = {
  id: T;
  label: string;
  icon: ReactNode;
};

export function BuilderTabs<T extends string>({
  tabs,
  active,
  onChange,
  trailing,
}: {
  tabs: BuilderTabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-surface-secondary px-3.5 py-2.5">
      <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-all duration-150 cursor-pointer ${
                selected
                  ? "bg-surface text-text-primary font-bold shadow-xs border border-border-subtle"
                  : "text-text-muted hover:text-text-primary hover:bg-surface/50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </div>
  );
}
