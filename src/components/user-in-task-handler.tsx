import { UserTasks } from "@/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React from "react";

export const UserInTaskHandler = ({
  user,
  showBtns,
  revokeUser,
}: {
  user: UserTasks;
  showBtns: boolean;
  revokeUser: (id: string) => void;
}) => {
  return (
    <div className="flex my-4 border-b border-b-gray-500 py-1 justify-between">
      <p key={user.id} className="text-xs text-gray-800">
        {" "}
        - {user.name} - {user.email}
      </p>
      <div>
        {showBtns && user.role !== 1 && (
          <button
            onClick={() => revokeUser(user.id)}
            className="rounded-full text-white bg-red-600"
          >
            {" "}
            <XMarkIcon width={20} height={20} />{" "}
          </button>
        )}
      </div>
    </div>
  );
};
