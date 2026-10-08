import { useState, type ReactNode } from "react";

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        <h2 id="confirm-dialog-title" className="text-base font-semibold text-text-primary font-heading">
          {title}
        </h2>
        <p className="mt-2 text-xs text-text-secondary leading-relaxed">{message}</p>
        <div className="mt-6 flex justify-end gap-2.5">
          <button
            type="button"
            className="rounded-lg border border-border-subtle bg-surface-secondary px-3.5 py-1.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all cursor-pointer"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="rounded-lg bg-danger px-4 py-1.5 text-xs font-semibold text-white hover:bg-danger/90 transition-all cursor-pointer shadow-sm active:scale-[0.985]"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirmDialog() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    message: string;
    resolve: ((value: boolean) => void) | null;
  }>({
    open: false,
    title: "",
    message: "",
    resolve: null,
  });

  function confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      setState({ open: true, title, message, resolve });
    });
  }

  const dialog: ReactNode = (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      message={state.message}
      onCancel={() => {
        state.resolve?.(false);
        setState((current) => ({ ...current, open: false, resolve: null }));
      }}
      onConfirm={() => {
        state.resolve?.(true);
        setState((current) => ({ ...current, open: false, resolve: null }));
      }}
    />
  );

  return { confirm, dialog };
}
