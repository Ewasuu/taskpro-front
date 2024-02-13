"use client";
import React from "react";
import { FormContainer } from "@/components/form/form-container";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/inputs/text-input";
import { error } from "console";
import { LoginType } from "@/types";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/utils/useLocalStorage";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const router = useRouter();

  const [_, setValue] = useLocalStorage("taskpro-token", null);

  const onSubmit = handleSubmit(async (data) => {
    const user: LoginType = {
      Email: data.email,
      Password: data.password,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    });

    const parsedResponse = await response.json();

    if (parsedResponse.success) {
      setValue(parsedResponse.token);
      router.push("/home");
    } else {
      console.log(parsedResponse);
      setError("password", {
        type: "manual",
        message:
          parsedResponse.errorMesage ??
          "Algo salio mal. Revisa tu conexion a internet y vuelve a intentarlo",
      });
    }
  });
  return (
    <FormContainer className="space-y-6" onSubmit={onSubmit}>
      <>
        <TextInput
          labelText="Correo electrónico"
          id="email"
          required
          type="email"
          autoComplete="email"
          errorMessage={errors.email?.message?.toString() ?? ""}
          {...register("email", {
            required: true,
          })}
        />

        <TextInput
          labelText="Contraseña"
          id="password"
          required
          type="password"
          autoComplete="current-password"
          errorMessage={errors.password?.message?.toString() ?? ""}
          {...register("password", {
            required: true,
          })}
        />

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Inciar Sesión
          </button>
        </div>
      </>
    </FormContainer>
  );
};
