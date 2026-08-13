"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#FFF8EC",
          color: "#4A3325",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", marginBottom: "0.75rem" }}>Something went wrong.</h1>
        <p style={{ color: "#7A5B45", marginBottom: "1.5rem" }}>
          HOLA Coffee hit an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#5AA9E6",
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: "0.75rem 2rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
