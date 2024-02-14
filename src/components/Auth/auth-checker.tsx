"use client";
import { tokenId } from "@/utils/const";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const routesWithAuth = ["/tasks", "/profile"];

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(tokenId);
      if (routesWithAuth.some((route) => path.includes(route))) {
        if (!isToken(token)) {
          window.location.href = `${window.location.origin}/`;
          return;
        }
      } else {
        if (isToken(token)) {
          window.location.href = `${window.location.origin}/tasks`;
          return;
        }
      }
    }
  }, [path]);

  return children;
};
export const isToken = (token: string | null) => {
  if (!token) return false;
  const parts = token.split(".");
  return parts.length === 3;
};

export default AuthChecker;
