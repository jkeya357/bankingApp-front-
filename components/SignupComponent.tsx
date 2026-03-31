"use client";

import { useSignUpMutation } from "@/store/auth/authApiSlice";
import { setCredentials, getAccessToken } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const SignUpComponent = () => {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const result = await signUp({
        firstName,
        lastName,
        email,
        password,
        userName,
      }).unwrap();

      toast(`New user created successfully ✅`, {
        description:
          "You can now login to your account to begin your journey with us",
        duration: 5000,
      });

      dispatch(setCredentials({ token: result.token, userId: result.userId }));

      router.push("/home");
    } catch (error) {
      setErrorMsg("Invalid email or password");
      toast("Error creating user", {
        description: "Something went wrong. Try again later.",
        duration: 5000,
      });
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
            <h1 className="text-3xl font-semibold text-white">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join Nzimbu Book and start managing your finances smartly
            </p>
          </div>

          {/* Error */}
          {errMsg && (
            <p className="text-red-400 text-center text-sm">{errMsg}</p>
          )}

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">First Name</Label>
                <Input
                  type="text"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Last Name</Label>
                <Input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            </div>

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
              <Label className="text-gray-300">Username</Label>
              <Input
                type="text"
                placeholder="Choose a username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="bg-black/40 border-white/10 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="relative space-y-2">
              <Label className="text-gray-300">Password</Label>
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

            <Button
              type="submit"
              className="w-full rounded-xl bg-gray-500 text-gray-200"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-gray-200 hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpComponent;
