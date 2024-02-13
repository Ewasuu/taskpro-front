import { TaskType } from "@/types";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

type TaskCardType = {
  data: TaskType;
  deleteTask: (id: string) => Promise<void>;
};

function formatDate(date: string) {
  let newDate = new Date(date ?? "");
  let day = newDate.getDate();
  let month = newDate.getMonth() + 1; // Los monthes en JavaScript empiezan en 0
  let year = newDate.getFullYear();

  const fechaFormateada = `${day}/${month}/${year}`;

  return fechaFormateada;
}

const TaskCard: React.FC<TaskCardType> = ({ data, deleteTask }) => {
  return (
    <li
      key={data.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <p className="text-xs truncate text-gray-500">
            Ultima actualización: {formatDate(data.updatedAt)}
          </p>

          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {data.title}
            </h3>
          </div>

          <p className="mt-1 truncate text-sm text-gray-500">
            {data.description}
          </p>
        </div>
      </div>

      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          {data.role === 1 && (
            <div className="flex w-0 flex-1">
              <button
                onClick={() => deleteTask(data.id)}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
              >
                <TrashIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Eliminar
              </button>
            </div>
          )}
          <div className="-ml-px flex w-0 flex-1">
            <Link
              href={`/task/${data.id}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Ver
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskCard;
