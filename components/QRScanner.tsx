"use client";

import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  isSuccess: boolean;
}

const QRScanner = ({ onScanSuccess, isSuccess }: QRScannerProps) => {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (isSuccess) {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .then(() => {
            console.log("Scanner cleared after success");
          })
          .catch((err) => {
            console.error("Error clearing scanner on success:", err);
          });
      }
      return;
    }

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      false
    );

    scanner.render(
      (decodedText: string) => {
        onScanSuccess(decodedText);
      },
      (errorMessage: any) => {
        console.log("QR Scan error:", errorMessage);
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .then(() => console.log("Scanner stopped and UI cleared."))
          .catch((error) =>
            console.error("Error stopping the scanner:", error)
          );
      }
    };
  }, [onScanSuccess, isSuccess]);

  return (
    <div
      className="text-sm md:text-base font-abeezee text-cowrie-bone"
      id="qr-reader"
    />
  );
};

export default QRScanner;
