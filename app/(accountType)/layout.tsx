import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        {/* PAGE HEADER */}
        <header className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">Account Overview</h1>
          <p className="text-gray-600">
            View and manage your accounts & transactions.
          </p>
        </header>

        {/* CONTENT WRAPPER */}
        <main className="bg-white rounded-xl shadow-sm p-6">{children}</main>
      </div>
    </div>
  );
};

export default layout;
