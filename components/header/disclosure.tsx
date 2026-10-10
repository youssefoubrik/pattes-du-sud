"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Props = {
  label: string;
  closeLabel?: string;
  trigger: ReactNode;
  openTrigger?: ReactNode;
  children: ReactNode;
  className?: string;
  buttonClassName: string;
  panelClassName: string;
  mobile?: boolean;
};

export function Disclosure({ label, closeLabel, trigger, openTrigger, children, className, buttonClassName, panelClassName, mobile }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismiss(event: Event) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        button.current?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    function resize() {
      if (mobile && desktop.matches) setOpen(false);
    }

    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("focusin", dismiss);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("focusin", dismiss);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
    };
  }, [open, mobile]);

  return (
    <div ref={container} className={className}>
      <button
        ref={button}
        type="button"
        aria-label={open ? closeLabel ?? label : label}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
        className={buttonClassName}
      >
        {open ? openTrigger ?? trigger : trigger}
      </button>
      <div id={id} hidden={!open} className={panelClassName} onClick={(event) => {
        if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
      }}>
        {children}
      </div>
    </div>
  );
}
