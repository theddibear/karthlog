"use client";

import { useEffect, useState } from "react";
import QRScanner from "@/components/QRScanner";
import { useRouter } from "next/navigation";
import { useSendDataMutation } from "@/store/api/api";
import { toast } from "react-toastify";
import { areValuesEmpty } from "@/utils/util";

const ScanPage = () => {
  const router = useRouter();
  const [scannedText, setScannedText] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [scanCode, { isLoading, reset }] = useSendDataMutation();
  const handleScan = async () => {
    const [cardNumber, cardHash] = scannedText.split("-");
    const isDataEmpty = areValuesEmpty({
      cardNumber: Number(cardNumber),
      cardHash,
    });
    if (isDataEmpty) {
      toast.error("Couldn't get Data, Scan again!");
      return;
    }
    const request = await scanCode({
      url: "karthlog/cards/scan",
      data: { cardNumber: Number(cardNumber), cardHash },
      type: "PATCH",
    });

    setScannedText("");

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
      setIsSuccess(true);
      router.push(`/wallet`);
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };

  useEffect(() => {
    if (scannedText !== "") {
      //MAKE API CALL
      handleScan();
    }
  }, [scannedText]);

  return (
    <div className="p-6">
      <h1 className="text-base md:text-xl font-bold mb-4 font-abeezee text-cowrie-bone">
        Scan QR Code
      </h1>
      <QRScanner
        onScanSuccess={(text) => setScannedText(text)}
        isSuccess={isSuccess}
      />

      {scannedText && (
        <div className="mt-4 p-2 border border-green-500 text-green-700">
          ✅ Scanned Result: <strong>{scannedText}</strong>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
