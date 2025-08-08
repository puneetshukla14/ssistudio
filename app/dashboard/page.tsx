"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function WelcomeBanner() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "No more manual logo placement — it’s fully automated.",
    "Standardized poster templates, ready to go.",
    "Upload your logo. We’ll handle the sizing and placement.",
    "Built for SSI’s creative team. Sharp. Fast. Reliable.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative z-0 overflow-hidden rounded-xl">
      {/* Background blurred blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-500/40 blur-3xl rounded-full animate-pulse-slow" />
      <div className="absolute top-1/2 -right-16 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full animate-pulse-slow delay-1000" />

      {/* Glass-like background card */}
      <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-4 sm:p-5 shadow-lg shadow-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 card">
        {/* Light sweep animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-[-150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-light-sweep" />
        </div>

        {/* Text section */}
        <div className="relative z-10">
          <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow">
            Welcome to <span className="font-bold text-blue-200">SSI Studio</span>
          </h2>
          <p
            key={quoteIndex}
            className="mt-1 text-sm sm:text-base text-white/90 font-light animate-fade-in drop-shadow"
          >
            {quotes[quoteIndex]}
          </p>
        </div>

        {/* CTA button */}
        <div className="relative z-10 flex flex-col gap-3 items-start sm:items-end text-sm text-white/80">
          <button className="px-3 py-1.5 text-sm rounded-md font-medium flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50 btn-primary">
            Create New Poster <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
