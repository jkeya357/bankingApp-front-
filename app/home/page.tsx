"use client";
import HomePage from "@/components/Home-Components/HomePage";
import { ReactNode } from "react";

const page = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default page;
