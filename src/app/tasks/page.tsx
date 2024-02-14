"use client";
import { isToken } from "@/components/Auth/auth-checker";
import { Drawer } from "@/components/drawer/drawer";
import { TodoForm } from "@/components/form/todo-form";
import { TaskGrid } from "@/components/grid/task-grid";
import { TaskType } from "@/types";
import { tokenId } from "@/utils/const";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function TaskPage() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const router = useRouter();

  const GetTasks = async (filter: string = "all") => {
    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks?filter${filter}`,
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
        setTasks(parsedResponse.data);
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  const deleteTask = async (id: string) => {
    const token = window.localStorage.getItem(tokenId);

    const cachedTask = tasks;

    setTasks(tasks.filter((t) => t.id !== id));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.replaceAll('"', "")}`,
        },
        method: "DELETE",
      }
    );

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        toast.success("Tarea eliminada");
      } else {
        setTasks(cachedTask);
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(tokenId);
    if (!isToken(token)) {
      router.push("/login");
    } else {
      setIsClient(true);
      GetTasks();
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <TaskGrid data={tasks ?? []} deleteTask={deleteTask} />
      <Drawer title="Crear Tarea" open={open} setOpen={setOpen}>
        <TodoForm setOpen={setOpen} setTasks={setTasks} />
      </Drawer>
    </div>
  );
}
