"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, AlertCircle } from "lucide-react";

const SCANNER_ELEMENT_ID = "hola-qr-scanner";

export default function QrScanner({ onScan }: { onScan: (decodedText: string) => void }) {
  const scannerRef = useRef<import("html5-qrcode").Html5Qrcode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        if (cancelled) return;

        const scanner = new Html5Qrcode(SCANNER_ELEMENT_ID);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            onScan(decodedText);
          },
          () => {
            // ignore per-frame "not found" errors — expected while aiming the camera
          }
        );
        if (!cancelled) setIsRunning(true);
      } catch {
        if (!cancelled) {
          setError("Camera access is unavailable. Check permissions or use a device with a camera.");
        }
      }
    }

    start();

    return () => {
      cancelled = true;
      const scanner = scannerRef.current;
      if (scanner) {
        scanner.stop().catch(() => {}).finally(() => scanner.clear());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-sm">
      <div
        id={SCANNER_ELEMENT_ID}
        className="overflow-hidden rounded-hola-lg bg-hola-brown shadow-md"
        style={{ minHeight: 280 }}
      />
      {!isRunning && !error && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-hola-brown-soft">
          <Camera className="h-4 w-4" /> Requesting camera access…
        </p>
      )}
      {error && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-red-600" role="alert">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}
    </div>
  );
}
