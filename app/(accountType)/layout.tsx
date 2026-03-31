"use client";

import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* PAGE HEADER */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Account Overview</h1>
          <p className="text-gray-400">
            View and manage your accounts & transactions.
          </p>
        </header>

        {/* CONTENT WRAPPER */}
        <main className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
