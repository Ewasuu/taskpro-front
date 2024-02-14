"use client";
import React, { useEffect } from "react";
import { FormContainer } from "./form-container";
import { useForm } from "react-hook-form";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { tokenId } from "@/utils/const";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CommentType } from "@/types";

type CommentFormType = {
  taskId: string;
  userId: string;
  userName: string;
  getComments: () => Promise<void>;
  comment: CommentType | undefined;
  setComment: React.Dispatch<React.SetStateAction<CommentType | undefined>>;
};

export const CommentForm: React.FC<CommentFormType> = ({
  taskId,
  userId,
  userName,
  getComments,
  comment,
  setComment,
}) => {
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      text: comment?.text,
    },
  });
  const router = useRouter();

  useEffect(() => {
    if (comment) {
      setValue("text", comment.text);
    } else {
      setValue("text", "");
    }
  }, [comment]);

  const onSubmit = handleSubmit(async (data) => {
    const token = window.localStorage.getItem(tokenId);
    const url = comment?.id
      ? `${process.env.NEXT_PUBLIC_API_URL}/comments/${comment?.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/comments`;

    const method = comment?.id ? "PUT" : "POST";
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replaceAll('"', "")}`,
      },
      body: JSON.stringify({
        text: data.text,
        taskId: taskId,
        userId: userId,
        userName: userName,
      }),
    });

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        setComment(undefined);
        getComments();
        reset();
      } else {
        console.log(parsedResponse);
        toast.error(parsedResponse.errorMessage);
      }
    }
  });

  return (
    <div className="mt-6 flex gap-x-3">
      <FormContainer onSubmit={onSubmit} className="relative flex-auto">
        <>
          {" "}
          <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
            <label htmlFor="comment" className="sr-only">
              Escribe acá
            </label>
            <textarea
              rows={2}
              {...register("text", {
                required: true,
              })}
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Escribe acá..."
              defaultValue={""}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <button
              type="submit"
              className="flex rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Enviar <ArrowLongRightIcon width={15} />
            </button>
          </div>
        </>
      </FormContainer>
    </div>
  );
};
