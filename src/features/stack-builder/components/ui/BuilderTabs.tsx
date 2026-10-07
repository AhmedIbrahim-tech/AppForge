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
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle bg-base px-3 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-[5px] px-2.5 py-1 font-mono text-xs transition-colors duration-150 cursor-pointer ${
                selected
                  ? "bg-surface-raised text-white font-medium border border-border-subtle"
                  : "text-text-muted hover:text-text-secondary"
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

