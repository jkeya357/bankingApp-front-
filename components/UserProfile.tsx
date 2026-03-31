"use client";

import { useGetUsersQuery, selectUserById } from "@/store/user/userApiSlice";
import { getCurrentUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Image from "next/image";
import defaultImage from "@/app/user.png";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const UserProfile = () => {
  useGetUsersQuery();

  const currentUser = useSelector(getCurrentUser);

  const user = useSelector((state: RootState) =>
    currentUser ? selectUserById(state, currentUser) : null,
  );
  console.log("found user", user);

  if (!user) return <p className="text-center mt-10">Loading user...</p>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-10 flex justify-center">
      <div className="max-w-3xl w-full space-y-8">
        {/* User Info Card */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
          <Image
            src={user.profilePicture || defaultImage}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border shadow-sm border-gray-200 dark:border-gray-700"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              @{user.userName}
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {user.email}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-400 mt-2">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Accounts Overview */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Accounts
          </h2>
          {user.accounts.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              No accounts yet. Create your first account to get started!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {user.accounts.map((acc) => (
                <div
                  key={acc.accountId}
                  className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl flex flex-col justify-between border border-gray-200 dark:border-gray-600"
                >
                  <p className="text-gray-800 dark:text-gray-200 font-semibold">
                    {acc.accountType}
                  </p>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {acc.accountNumber}
                  </p>
                  <p className="text-gray-900 dark:text-white font-bold mt-2">
                    R {acc.accountBalance.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
