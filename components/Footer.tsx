"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="w-full mt-20 border-t border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP SECTION */}
        <div className="grid md:grid-cols-3 gap-10 text-sm">
          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">
              <span className="text-primary">Nzimbu</span> Book
            </h2>
            <p className="text-gray-400 max-w-sm">
              Smart financial management built for clarity, control, and
              confidence. Track, manage, and grow your money effortlessly.
            </p>
          </div>

          {/* LINKS */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Product</h3>
            <div className="flex flex-col gap-2 text-gray-400">
              <Link href="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>
              <Link href="/profile" className="hover:text-white transition">
                Profile
              </Link>
              <Link href="/settings" className="hover:text-white transition">
                Settings
              </Link>
            </div>
          </div>

          {/* SOCIALS */}
          <div className="space-y-4">
            <h3 className="text-white font-medium">Connect</h3>
            <div className="flex flex-col gap-2 text-gray-400">
              <span className="hover:text-white transition cursor-pointer">
                Instagram — nzimbuBanking
              </span>
              <span className="hover:text-white transition cursor-pointer">
                Facebook — nzimbuBanking
              </span>
              <span className="hover:text-white transition cursor-pointer">
                X (Twitter) — nzimbuBanking
              </span>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <Separator className="my-8 bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Nzimbu Book. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
