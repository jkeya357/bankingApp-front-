import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="w-full flex items-center justify-center px-6 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Take Control of Your <span className="text-primary">Finances</span>
          </h1>

          <p className="text-gray-200 text-lg leading-relaxed max-w-lg">
            Nzimbu Book helps you track, manage, and grow your money with
            powerful tools designed for clarity and control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-44 bg-blue-700">
                Get Started
              </Button>
            </Link>

            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-44 border-none bg-gray-500 text-gray-200 hover:bg-white/10"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE (GLASS CARD) */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-200">
              Why Nzimbu Bank?
            </h2>

            <ul className="space-y-4 text-gray-300 text-sm list-disc marker:text-gray-200">
              <li className="flex items-start gap-3">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary" />
                Secure transactions
              </li>

              <li className="flex items-start gap-3">
                <span className="h-2 w-2 mt-2 rounded-full bg-primary" />
                Real-time analytics
              </li>

              <li className="flex items-start gap-3">
                <span className="h-2 w-2 mt-2 bg-primary rounded-full" />
                Clean dashboards built for clarity
              </li>

              <li className="flex items-start gap-3">
                <span className="h-2 w-2 mt-2 bg-primary rounded-full" />
                Built for modern financial management
              </li>
            </ul>

            <div className="pt-4">
              <Link href="/auth/signup">
                <Button className="w-full bg-gray-500">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
