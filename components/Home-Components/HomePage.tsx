"use client";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "@/store/user/userApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { selectUserById, selectAllUsers } from "@/store/user/userApiSlice";
import { useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import UserInfo from "@/components/Home-Components/UserInfo";
import AccountSection from "@/components/Account-Components/AccountSection";
import { RootState } from "@/store/store";
import defaultImage from "@/app/user.png";

const HomePage = () => {
  const { data: userData } = useGetUsersQuery();

  const loggedInUser = useSelector(getCurrentUser)!;
  const router = useRouter();

  const user = useSelector((state: RootState) =>
    selectUserById(state, loggedInUser)
  );

  useEffect(() => {
    if (!user) {
      redirect("/auth/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-10">
      {/* User Card */}
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <Image
            src={user.profilePicture || defaultImage}
            alt="profile picture"
            width={90}
            height={90}
            className="rounded-full border shadow-sm"
          />

          {/* User Info */}
          <UserInfo user={user} />
        </div>

        {/* Accounts Section */}
        <div className="mt-8">
          <AccountSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
