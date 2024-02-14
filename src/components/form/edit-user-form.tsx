"use client";
import React, { Dispatch, SetStateAction } from "react";
import { FormContainer } from "./form-container";
import { useForm } from "react-hook-form";
import { TextInput } from "../inputs/text-input";
import { tokenId } from "@/utils/const";
import { useRouter } from "next/navigation";
import { UserType } from "@/types";
import toast from "react-hot-toast";

type EditUserFormType = {
  userName: string;
  userEmail: string;
  userId: string;
  setUser: Dispatch<SetStateAction<UserType | undefined>>;
};

export const EditUserForm: React.FC<EditUserFormType> = ({
  userEmail,
  userName,
  userId,
  setUser,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: userName,
      email: userEmail,
    },
  });
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const token = window.localStorage.getItem(tokenId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.replaceAll('"', "")}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 401) {
        localStorage.removeItem(tokenId);
        router.push("/login");
      } else {
        const parsedResponse = await response.json();

        if (parsedResponse.success) {
          setUser({
            email: userEmail,
            id: userId,
            UserName: data.name,
          });
        } else {
          toast.error(
            parsedResponse.errorMessage ??
              "Algo salió mal, verifique su conexion a internet y vuelva a intentarlo"
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <FormContainer onSubmit={onSubmit} className="">
        <>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-4">
            <TextInput
              labelText="Nombre y apellido"
              id="userName"
              errorMessage={errors.name?.message?.toString() ?? ""}
              {...register("name", {
                required: {
                  value: true,
                  message: "No puedes dejar el nombre vacion",
                },
              })}
            />
            <TextInput
              labelText="Correo electrónico"
              id="mail"
              disabled
              errorMessage={errors.email?.message?.toString() ?? ""}
              {...register("email", {
                required: {
                  value: true,
                  message: "No puedes dejar el nombre vacio",
                },
              })}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-40 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </>
      </FormContainer>
    </div>
  );
};
