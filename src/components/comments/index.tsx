import { CommentType } from "@/types";
import { tokenId } from "@/utils/const";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type CommmentsType = {
  comments: CommentType[];
  className: string;
  getComments: () => void;
  setComment: React.Dispatch<React.SetStateAction<CommentType | undefined>>;
};

export const Comments: React.FC<CommmentsType> = ({
  comments,
  className,
  getComments,
  setComment,
}) => {
  const router = useRouter();

  const deleteComment = async (id: string) => {
    const token = window.localStorage.getItem(tokenId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.replaceAll('"', "")}`,
        },
      }
    );

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("/login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        console.log(parsedResponse);
        getComments();
      } else {
        console.log(parsedResponse);
        toast.error(parsedResponse.errorMessage);
      }
    }
  };
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold leading-6 text-gray-900">
        Comentarios
      </h2>
      <div className="max-h-[60vh] overflow-y-scroll">
        <ul role="list" className="mt-6 space-y-6">
          {comments?.map((comment, i) => (
            <li key={i} className="relative flex gap-x-4">
              <div
                className={classNames(
                  i === comments.length - 1 ? "h-6" : "-bottom-6",
                  "absolute left-0 top-0 flex w-6 justify-center"
                )}
              ></div>
              <>
                <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                  <div className="flex justify-between gap-x-4">
                    <div className="py-0.5 text-xs leading-5 text-gray-500">
                      <span className="font-medium text-gray-900">
                        {comment.userName}
                      </span>{" "}
                    </div>
                    <time
                      dateTime={comment.date}
                      className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                    >
                      {comment.date}
                    </time>
                  </div>
                  <p className="text-sm leading-6 text-gray-500">
                    {comment.text}
                  </p>
                  <div>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="text-red-600 px-4"
                    >
                      <TrashIcon width={15} height={15} />{" "}
                    </button>
                    <button
                      onClick={() => setComment(comment)}
                      className="text-blue-600 px-4"
                    >
                      <PencilIcon width={15} height={15} />{" "}
                    </button>
                  </div>
                </div>
              </>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
