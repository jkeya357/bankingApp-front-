"use client";

import { useEffect, useState } from "react";
import { useRefreshMutation } from "@/store/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/auth/authSlice";
import LoadingComponent from "./LoadingComponent";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await refresh().unwrap();

        dispatch(
          setCredentials({
            token: res.token,
            userId: res.userId,
          }),
        );
      } catch (err) {
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, []);

  if (isInitializing) return <LoadingComponent />;

  return <>{children}</>;
}
