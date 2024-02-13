"use client";
import { tokenId } from "@/utils/const";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const routesWithAuth = ["/tasks"];

const AuthCheker = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const path = usePathname();

  if (routesWithAuth.some((route) => route == path)) {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(tokenId);
      if (token && token.length > 10) {
        return children;
      } else {
        router.push("/login");
      }
    }
  } else {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(tokenId);
      if (token && token.length > 10) {
        router.push("/tasks");
      } else {
        return children;
      }
    }
  }
};

export default AuthCheker;
