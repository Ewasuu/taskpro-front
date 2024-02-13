"use client";
import { tokenId } from "@/utils/const";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LogouPage() {
  const router = useRouter();

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    localStorage.removeItem(tokenId);
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  router.push("/login");
  return <></>;
}
