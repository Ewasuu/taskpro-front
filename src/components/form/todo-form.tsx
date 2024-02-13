"use client";
import React from "react";
import { FormContainer } from "./form-container";
import { TextInput } from "../inputs/text-input";
import { useForm } from "react-hook-form";
import { error } from "console";
import { tokenId } from "@/utils/const";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TaskType } from "@/types";

type TodoFormType = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

export const TodoForm: React.FC<TodoFormType> = ({ setOpen, setTasks }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replaceAll('"', "")}`,
      },
      body: JSON.stringify({ ...data, isCompleted: false }),
    });

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        const newTask: TaskType = {
          createdAt: parsedResponse.data.createdAt,
          description: parsedResponse.data.description,
          id: parsedResponse.data.id,
          isCompleted: parsedResponse.data.isCompleted,
          role: 1,
          title: parsedResponse.data.title,
          updatedAt: parsedResponse.data.updatedAt,
        };
        setTasks((prev) => prev.concat(newTask));
        setOpen(false);
        toast.success("Creado xitosamente");
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  });

  return (
    <FormContainer className="space-y-6" onSubmit={onSubmit}>
      <>
        <TextInput
          labelText="Titulo"
          maxLength={100}
          id="title"
          required
          errorMessage={errors.title?.message?.toString() ?? ""}
          {...register("title", {
            required: {
              value: true,
              message: "Debe colocar un titulo",
            },
          })}
        />
        <TextInput
          labelText="Descripcion"
          id="description"
          maxLength={100}
          {...register("description", {
            required: false,
          })}
        />

        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="flex items-center rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Crear
          </button>
          <button
            type="reset"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center rounded-md px-6 py-2.5 text-black text-sm font-semibold  shadow-sm border border-gray-500 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Cancelar
          </button>
        </div>
      </>
    </FormContainer>
  );
};
