"use client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export function withToken(PageComponent: NextPage) {
  return () => {
    const router = useRouter();

    const token = localStorage.getItem("taskpro-token");

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token, router]);

    // Si hay un token, renderiza el componente de la página
    return token ? <PageComponent /> : null;
  };
}
