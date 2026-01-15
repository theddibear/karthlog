import React, { useRef, useEffect, useState } from "react";
import { PrinterIcon } from "lucide-react";
import { CardItem } from "@/utils/types";
import Button from "../Button";
import * as QRCodeLib from "qrcode";

interface CardDisplayProps {
  cardItem: CardItem;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({ cardItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [qrSVG, setQrSVG] = useState<string>("");

  const qrCodeData = `${cardItem.cardNumber}-${cardItem.cardHash}`;

  useEffect(() => {
    QRCodeLib.toString(
      qrCodeData,
      { type: "svg", width: 150, errorCorrectionLevel: "H" },
      (err, svg) => {
        if (!err && svg) setQrSVG(svg);
      }
    );
  }, [qrCodeData]);

  const handlePrint = () => {
    if (cardRef.current && qrSVG) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        const styles = `
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0ead6;
          }
          .card {
            padding: 20px;
            border: 2px solid #c28840;
            border-radius: 10px;
            background-color: #1c1c1c;
            color: #f0ead6;
            text-align: center;
            width: 300px;
          }
          .amount {
            font-size: 24px;
            font-weight: bold;
            color: #c28840;
            margin: 15px 0;
          }
          .card-number {
            margin-bottom: 10px;
            font-size: 14px;
          }
          .qr-container {
            background: white;
            padding: 15px;
            border-radius: 5px;
            display: inline-block;
          }
        `;
        printWindow.document.write(`
          <html>
            <head>
              <title>Print Card</title>
              <style>${styles}</style>
            </head>
            <body>
              <div class="card">
                <div class="card-number">Card #${cardItem.cardNumber}</div>
                <div class="qr-container">
                  ${qrSVG}
                </div>
                <div class="amount">${cardItem.card.cowrieAmount} Cowrie</div>
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  window.setTimeout(function() {
                    window.close();
                  }, 500);
                }
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-forged-black border border-antique-brass rounded-lg p-6 flex flex-col items-center"
    >
      <div className="text-sm text-antique-brass mb-2">
        Card #{cardItem.cardNumber}
      </div>

      <div
        className="qr-code bg-white p-4 rounded mb-4"
        dangerouslySetInnerHTML={{ __html: qrSVG }}
      />

      <div className="text-sm md:text-base font-bold text-cowrie-bone mb-4 font-abeezee">
        {cardItem.card.name}
      </div>

      <div className="text-xs font-bold text-antique-brass mb-4 font-abeezee">
        <span>{cardItem.card.cowrieAmount} Cowrie</span>
      </div>

      <Button
        onClick={handlePrint}
        variant="primary"
        className="flex items-center justify-between gap-2 cursor-pointer"
      >
        <PrinterIcon size={16} />
        Print Card
      </Button>
    </div>
  );
};
