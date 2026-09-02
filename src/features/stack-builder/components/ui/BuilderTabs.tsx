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
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-[#12151f]/90 px-3 py-2.5 sm:px-4">
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200 cursor-pointer ${
                selected
                  ? "bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-400/40"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
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
