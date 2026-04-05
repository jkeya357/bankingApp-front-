"use client";

import { useGetUsersQuery, selectAllUsers } from "@/store/user/userApiSlice";
import { getCurrentUser, logout } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import bankApi from "@/store/api/bankApi";

const Header = () => {
  const loggedInUser = useSelector(getCurrentUser);
  useGetUsersQuery();

  const dispatch = useDispatch();
  const router = useRouter();

  const users = useSelector(selectAllUsers);
  const currentUser = users?.find((user: any) => user.userId === loggedInUser);

  const handleLongout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(bankApi.util.resetApiState());
    router.push("/");
  };

  return (
    <header className="w-full border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          href={currentUser ? "/home" : "/"}
          className="text-xl font-semibold tracking-tight text-white"
        >
          <span className="text-gray-400">NZIMBU</span> BANKING
        </Link>

        {/* NOT LOGGED IN */}
        {!currentUser && (
          <div className="flex items-center gap-3">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-gray-300 bg-gray-500 hover:text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>

            <Link href="/auth/signup">
              <Button className="bg-blue-700 hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
        )}

        {/* LOGGED IN */}
        {currentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 px-3 py-2 rounded-xl transition">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={currentUser.profilePicture} />
                  <AvatarFallback>
                    {currentUser.userName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-sm font-medium text-white">
                    {currentUser.userName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {currentUser.lastName}
                  </span>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-48 bg-[#111] border border-white/10 text-white">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-400 focus:text-red-300 hover:pointer"
                onClick={handleLongout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default Header;
