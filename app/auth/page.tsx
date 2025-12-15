"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-blue-200 bg-white/90 backdrop-blur">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-700 tracking-tight">
            Welcome to Nzimbu Banking
          </h1>
          <p className="text-center text-gray-600 text-sm">
            Manage your accounts, transfers, and transactions seamlessly.
          </p>

          <div className="flex flex-col gap-4 pt-4">
            <Link href="/login">
              <Button className="w-full rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition-all">
                Login
              </Button>
            </Link>

            <Link href="/SignUp">
              <Button
                variant="outline"
                className="w-full rounded-xl py-3 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Create Account
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
