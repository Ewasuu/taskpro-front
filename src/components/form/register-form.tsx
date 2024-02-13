"use client";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { FormContainer } from "./form-container";
import { TextInput } from "../inputs/text-input";
import { RegisterType } from "../../types/index";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm();

  const router = useRouter();

  const password = watch("password");
  const repeatPassword = watch("repeat_password");

  const onSubmit = handleSubmit(async (data) => {
    if (password !== repeatPassword) {
      setError("repeat_password", {
        type: "manual",
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    const user: RegisterType = {
      Email: data.email,
      Password: data.password,
      UserName: data.name,
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      }
    );

    const parsedResponse = await response.json();

    if (parsedResponse.success) {
      toast.success("Te has registrado correctamente");
      router.push("/login");
    } else {
      setError("repeat_password", {
        type: "manual",
        message:
          parsedResponse.errorMesage ??
          "Algo salio mal. Revisa tu conexion a internet y vuelve a intentarlo",
      });
    }
  });

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <FormContainer className="space-y-6" onSubmit={onSubmit}>
        <>
          <TextInput
            labelText="Nombre"
            id="name"
            required
            autoComplete="given-name"
            errorMessage={errors.name?.message?.toString() ?? ""}
            {...register("name", {
              required: {
                value: true,
                message: "por favor ingrese su nombre de usuario",
              },
            })}
          />

          <TextInput
            labelText="Correro electrónico"
            id="email"
            required
            type="email"
            autoComplete="email"
            errorMessage={errors.mail?.message?.toString() ?? ""}
            {...register("email", {
              required: {
                value: true,
                message: "Por favor ingrese el correo",
              },
            })}
          />

          <TextInput
            labelText="Contraseña"
            id="password"
            required
            type="password"
            errorMessage={errors.password?.message?.toString() ?? ""}
            {...register("password", {
              required: {
                value: true,
                message: "Debe colocar la contraseña",
              },
            })}
          />

          <TextInput
            labelText="Repite la contraseña"
            id="repeat_password"
            required
            type="password"
            errorMessage={errors.repeat_password?.message?.toString() ?? ""}
            {...register("repeat_password", {
              required: {
                value: true,
                message: "Debe validar la contraseña",
              },
            })}
          />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Registrarse
            </button>
          </div>
        </>
      </FormContainer>

      <p className="mt-10 text-center text-sm text-gray-500">
        ¿No tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Registrate
        </Link>
      </p>
    </div>
  );
};
