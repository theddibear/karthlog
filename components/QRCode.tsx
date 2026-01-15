import React, { useEffect, useRef } from "react";
import QRCodeLib from "qrcode";
interface QRCodeProps {
  value: string;
  size?: number;
  level?: "L" | "M" | "Q" | "H";
  bgColor?: string;
  fgColor?: string;
  className?: string;
}
const QRCode = ({
  value,
  size = 128,
  level = "M",
  bgColor = "#FFFFFF",
  fgColor = "#1C1C1C",
  className = "",
}: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 0,
          color: {
            dark: fgColor,
            light: bgColor,
          },
          errorCorrectionLevel: level,
        },
        (error) => {
          if (error) console.error("Error generating QR code:", error);
        }
      );
    }
  }, [value, size, level, bgColor, fgColor]);
  return (
    <canvas
      ref={canvasRef}
      className={`rounded-sm ${className}`}
      width={size}
      height={size}
    />
  );
};
export default QRCode;
