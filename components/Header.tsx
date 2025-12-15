"use client";
import { useGetUsersQuery, selectAllUsers } from "@/store/user/userApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeaderModel from "./HeaderModel";
import defaultUserImg from "@/app/user.png";

const Header = () => {
  const loggedInUser = useSelector(getCurrentUser);

  useGetUsersQuery();

  const user = useSelector(selectAllUsers);
  const [open, setOpen] = useState(false);

  const currentUser = user?.find((user: any) => user.id === loggedInUser);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}

        <Link
          href={currentUser ? "/home" : "/"}
          className="text-2xl font-bold text-blue-600"
        >
          MyBank
        </Link>

        {/* Not Logged In */}
        {!currentUser && (
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </div>
        )}

        {/* Logged In User */}
        {currentUser && (
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setOpen(true)}
          >
            {/* Profile image */}
            <Image
              src={currentUser.profilePicture ?? defaultUserImg}
              alt=""
              width={40}
              height={40}
              className="rounded-full border"
            />

            {/* User Info */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                {currentUser.userName}
              </span>
              <span className="text-sm text-gray-500">
                {currentUser.lastName}
              </span>
            </div>
          </div>
        )}
        <HeaderModel open={open} onClose={() => setOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
