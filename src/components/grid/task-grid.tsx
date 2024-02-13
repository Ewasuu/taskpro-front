import React from "react";
import TaskCard from "../cards/task-card";
import { TaskType } from "@/types";

type taskGridType = {
  data: TaskType[];
  deleteTask: (id: string) => Promise<void>;
};

export const TaskGrid: React.FC<taskGridType> = ({ data, deleteTask }) => {
  return (
    <div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {data?.map((task) => (
          <TaskCard data={task} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};
