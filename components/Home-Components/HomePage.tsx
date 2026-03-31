"use client";

import { useSelector } from "react-redux";
import { useGetUsersQuery, selectUserById } from "@/store/user/userApiSlice";
import { getAccessToken, getCurrentUser } from "@/store/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { RootState } from "@/store/store";

import UserInfo from "@/components/Home-Components/UserInfo";
import AccountSection from "@/components/Account-Components/AccountSection";
import defaultImage from "@/app/user.png";

const HomePage = () => {
  useGetUsersQuery(undefined, {});

  const loggedInUser = useSelector(getCurrentUser)!;

  const accessToken = useSelector(getAccessToken);

  const user = useSelector((state: RootState) =>
    selectUserById(state, loggedInUser),
  );

  useEffect(() => {
    if (!accessToken) {
      redirect("/auth/login");
    }
  }, [accessToken]);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] p-10 flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full" />
      </div>

      {/* User Card */}
      <div className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Profile Picture */}
          <Image
            src={user?.profilePicture || defaultImage}
            alt="profile picture"
            width={100}
            height={100}
            className="rounded-full border border-white/20 shadow-sm"
          />

          {/* User Info */}
          <div className="flex-1">
            <UserInfo user={user} />
          </div>
        </div>

        {/* Accounts Section */}
        <div className="mt-6">
          <AccountSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
