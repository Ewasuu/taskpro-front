"use client";
import { tokenId } from "@/utils/const";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const routesWithAuth = ["/tasks"];

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(tokenId);

      if (routesWithAuth.some((route) => path.includes(route))) {
        if (!token || token.length <= 10) {
          router.push("/login");
        }
      } else {
        if (token && token.length > 10) {
          router.push("/tasks");
        }
      }
    }
  }, [router, path]);

  return children;
};

export default AuthChecker;
