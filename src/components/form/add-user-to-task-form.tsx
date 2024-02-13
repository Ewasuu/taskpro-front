"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../inputs/text-input";
import { UserTasks, UserType } from "@/types";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { tokenId } from "@/utils/const";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddUserToTaskForm = ({
  currentUserId,
  addUser,
}: {
  currentUserId: string;
  addUser: (id: string, user: UserTasks) => void;
}) => {
  const router = useRouter();

  const [users, setUsers] = useState<UserTasks[]>();

  const onSubmit = async (key: any) => {
    if (!key) {
      setUsers([]);
      return;
    }
    const token = window.localStorage.getItem(tokenId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/search/${key}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.replaceAll('"', "")}`,
        },
      }
    );

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        const newUsers: UserTasks[] = parsedResponse.data;
        setUsers(newUsers.filter((user) => user.id !== currentUserId));
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  return (
    <div className="space-y-6">
      <>
        <TextInput
          labelClassname="Usuario"
          placeholder="Escriba el nombre o el correo de un usuario"
          //@ts-ignore
          onInput={(e) => onSubmit(e.target.value)}
        />
        <div className="overflow-y-scroll space-y-4">
          {users?.map((user) => {
            return (
              <div
                key={user.id}
                className=" flex items-center justify-between border-b text-black border-b-gray-700"
              >
                <div>
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
                <button
                  onClick={() => addUser(user.id ?? "", user)}
                  className="flex items-center m-0 justify-center rounded-full w-8 h-8 bg-blue-600 text-white"
                >
                  {" "}
                  <PlusIcon width={20} height={20} />{" "}
                </button>
              </div>
            );
          })}
        </div>
      </>
    </div>
  );
};

export default AddUserToTaskForm;
