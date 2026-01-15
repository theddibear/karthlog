"use client";

import { areValuesEmpty } from "@/utils/util";
import { useState } from "react";
import { useSendDataMutation } from "@/store/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    join();
  };

  //MAKE API CALL
  const [waitlist, { isLoading, reset }] = useSendDataMutation();
  const join = async () => {
    const isUserEmpty = areValuesEmpty({ email: email });
    if (isUserEmpty) {
      toast.success("Empty Fields");
      return;
    }

    const request = await waitlist({
      url: "auth/waitlist",
      data: { email: email },
      type: "POST",
    });

    if (request?.data) {
      const { data, message, status } = request?.data;
      toast.success(message);
      setSubmitted(true);
      window.location.href =
        "https://whatsapp.com/channel/0029VaFoGCUAO7RDexH0FR23";
    } else {
      toast.error(
        request?.error?.data?.message
          ? request?.error?.data?.message
          : "Check Internet Connection and try again"
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#221911] text-[#ECF0F1] w-full h-fit px-4 py-4 md:px-20 md:py-5 font-abeezee">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Left: Form */}
      <div className="md:w-1/2 w-full p-10 flex items-center justify-center bg-[#2b1f18]">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Join the Waitlist
          </h1>
          <h4 className="text-xl font-bold mb-6 text-center">
            This story needs you to carry it
          </h4>

          <div className="bg-[#e68001] text-white p-6 rounded-lg text-center shadow-lg">
            <p className="text-lg font-medium"> Karthlog Waitlist Update</p>
            <p className="text-sm mt-2">
              We’re closing the waitlist to focus on the community we’ve already
              gathered. Everyone who subscribed before now is part of this first
              chapter. Thank you for stepping in early together we’ll build what
              comes next.
            </p>
          </div>

          {/* {submitted ? (
            <div className="bg-[#e68001] text-white p-6 rounded-lg text-center shadow-lg">
              <p className="text-lg font-medium">🎉 You're on the list!</p>
              <p className="text-sm mt-2">We’ll notify you once we launch.</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#3a2b22] p-6 rounded-lg shadow-xl space-y-4"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-md text-[#f0ead6] placeholder:text-[#8e7c6f] focus:outline-none focus:ring-2 focus:ring-[#f0ead6]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#e68001] hover:bg-[#cc6e00] transition-colors text-white font-semibold py-2 px-4 rounded-md"
              >
                {isLoading
                  ? "Joining..."
                  : "Be part of the first 100 who knew before it arrived"}
              </button>
            </form>
          )} */}
        </div>
      </div>

      {/* Right: Info */}
      <div className="md:w-1/2 w-full p-10 bg-[#221911] flex flex-col justify-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-[#ECF0F1]">
            Karthlog Waitlist
          </h2>
          <h3>Powered by MadeInBlacc Factory</h3>

          <p className="text-[#ECF0F1]/80 leading-relaxed">
            Karthlog isn’t just a collectible — it’s your passport to the inner
            workings of a silent cultural engine. Curated by MadeInBlacc
            Factory, each card unlocks access to ideas, movements, and products
            being built to reshape Africa from the inside out.
          </p>
          <p className="text-[#ECF0F1]/80 leading-relaxed">
            Be one of the first 100 to know before it arrives. Sign up to become
            a Founding Collector.
          </p>

          <h3>Get early access to the full Karthlog experience:</h3>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4 text-center">
            <div>
              <p className="text-3xl font-bold text-[#e68001]">.</p>
              <p className="text-sm text-[#ECF0F1]/70">
                Limited-edition collectible cards
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#e68001]">.</p>
              <p className="text-sm text-[#ECF0F1]/70">
                Hidden story drops & field notes
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-[#e68001]">.</p>
              <p className="text-sm text-[#ECF0F1]/70">
                Insider invites from the Factory floor
              </p>
            </div>
          </div>

          <p className="text-[#ECF0F1]/80 leading-relaxed">
            Once you’re in, we’ll redirect you to our WhatsApp channel where the
            story continues in real-time — direct from the Factory
          </p>
        </div>
      </div>
    </div>
  );
}
