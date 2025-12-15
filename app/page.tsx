import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col justify-center items-center p-6">
      {/* CONTENT CARD */}
      <div className="max-w-2xl text-center space-y-6 p-10 rounded-2xl border bg-card shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Welcome to <span className="text-primary">Nzimbu Book</span>
        </h1>

        <p className="text-muted-foreground text-lg leading-relaxed">
          We handle your money with care — securely, transparently, and with
          absolute dedication. Manage your finances smarter with Nzimbu Book.
        </p>

        {/* BUTTON GROUP */}
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <Link href="/auth/login">
            <Button size="lg" className="w-full md:w-auto">
              Login
            </Button>
          </Link>

          <Link href="/auth/signup">
            <Button size="lg" variant="outline" className="w-full md:w-auto">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
