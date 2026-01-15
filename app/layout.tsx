import type { Metadata } from "next";
import { Titan_One, ABeeZee } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { StoreProvider } from "@/store/provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const titan_one = Titan_One({
  variable: "--font-titan",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const abeezee = ABeeZee({
  variable: "--font-abeezee",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Karthlog",
  description:
    "Karthlog cards blend digital currency with collectible art, giving you access to exclusive content, discounts, and a community of creators and collectors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${titan_one.variable} ${abeezee.variable} antialiased`}
        >
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
