"use client";
import React, { useEffect, useState } from "react";
import { Comments } from ".";
import { CommentForm } from "../form/comment-form";
import { CommentType } from "@/types";
import { useRouter } from "next/navigation";
import { tokenId } from "@/utils/const";
import toast from "react-hot-toast";

type CommenContainer = {
  taskId: string;
  userId: string;
  userName: string;
};

export const CommentsContainer: React.FC<CommenContainer> = ({
  taskId,
  userId,
  userName,
}) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const router = useRouter();
  const getComments = async () => {
    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${taskId}`,
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
        setComments(parsedResponse.data);
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  useEffect(() => {
    if (taskId) {
      getComments();
    }
  }, [taskId]);

  return (
    <div>
      <Comments comments={comments} className="" />

      <CommentForm
        taskId={taskId}
        userId={userId}
        userName={userName}
        getComments={getComments}
      />
    </div>
  );
};
