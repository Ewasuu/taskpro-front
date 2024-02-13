import React from "react";
import { FormContainer } from "./form-container";
import { useForm } from "react-hook-form";
import { TextInput } from "../inputs/text-input";

type EditTaskFormType = {
  taskTile: string;
  taskDescription: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditTaskForm: React.FC<EditTaskFormType> = ({
  taskDescription,
  taskTile,
  setOpen,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: taskTile,
      description: taskDescription,
    },
  });

  const onSubmit = handleSubmit(async (data) => {});
  return (
    <div className="mt-6 gap-x-3">
      <FormContainer
        onSubmit={onSubmit}
        className="relative space-y-4 flex-auto"
      >
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
    </div>
  );
};
