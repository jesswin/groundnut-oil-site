"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

/** Toasts, styled with the site theme tokens. The site is light-only, so the theme is fixed. */
export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="top-center"
      richColors
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          fontFamily: "var(--font-body)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
