"use client";
import { useCreateUserMutation } from "@/store/user/userApiSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const SignUpComponent = () => {
  const router = useRouter();

  const [signUp, { isLoading }] = useCreateUserMutation();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [errMsg, setErrorMsg] = useState<string>();

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
      toast(`New user ${result.userName} created successfuly ✅`, {
        description:
          "You can now login to your account to begin your journey with us",
        duration: 5000,
      });
      router.push("/");
    } catch (error) {
      console.log("Error loggin in", error);
      setErrorMsg("invalid email or password");
      toast("Error creating user", {
        description: "Something went wrong try again later",
        duration: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center">Create a user</h1>

          {errMsg && (
            <p className="text-red-600 text-center text-sm">{errMsg}</p>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label>first Name</Label>
              <Input
                type="name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>last Name</Label>
              <Input
                type="name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                type="username"
                placeholder="create your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Creating user..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpComponent;
