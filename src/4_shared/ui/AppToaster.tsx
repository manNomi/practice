"use client";

import { Toaster } from "react-hot-toast";

export function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          border: "1px solid var(--line)",
          color: "var(--foreground)",
          fontFamily: "Pretendard, Arial, Helvetica, sans-serif"
        }
      }}
    />
  );
}
