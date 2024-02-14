"use client";
import { EditUserForm } from "@/components/form/edit-user-form";
import { UserType } from "@/types";
import { tokenId } from "@/utils/const";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<UserType>();
  const router = useRouter();
  const getMe = async () => {
    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replaceAll('"', "")}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        console.log(parsedResponse);
        setUser({
          email: parsedResponse.data.email,
          id: parsedResponse.data.id,
          UserName: parsedResponse.data.name,
        });
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  useEffect(() => {
    getMe();
  }, []);
  return (
    <main className="relative isolate px-6 pt-14 lg:px-8">
      <div className="my-4 flex items-center space-x-2">
        <button onClick={() => router.back()} className="text-indigo-600">
          {" "}
          <ArrowLeftIcon width={20} />{" "}
        </button>
        <p className="text-black">
          Perfil | <span>{user?.UserName}</span>
        </p>
      </div>
      {user != null && (
        <EditUserForm
          setUser={setUser}
          userEmail={user?.email ?? ""}
          userId={user?.id ?? ""}
          userName={user?.UserName ?? ""}
        />
      )}
    </main>
  );
}
