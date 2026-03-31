"use client";

import { useLoginMutation } from "@/store/auth/authApiSlice";
import { setCredentials } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const result = await login({ email, password }).unwrap();

      dispatch(setCredentials({ token: result.token, userId: result.userId }));

      if (result) {
        router.push("/home");
      }
    } catch (error) {
      setErrorMsg("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] px-6">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          {/* Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-white">Welcome back</h1>
            <p className="text-gray-400 text-sm">
              Login to continue to Nzimbu Book
            </p>
          </div>

          {/* Error */}
          {errMsg && (
            <p className="text-red-400 text-center text-sm">{errMsg}</p>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-gray-300">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Password</Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 bg-black/40 border-white/10 text-white placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl bg-gray-500 text-gray-200"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-gray-200 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginComponent;
