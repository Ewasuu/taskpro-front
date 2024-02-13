"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TaskDetail, UserTasks, UserType } from "@/types";
import { tokenId } from "@/utils/const";
import toast from "react-hot-toast";
import formatDate from "@/utils/format-date";
import { UserInTaskHandler } from "@/components/user-in-task-handler";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Drawer } from "@/components/drawer/drawer";
import AddUserToTaskForm from "@/components/form/add-user-to-task-form";
import { CommentsContainer } from "@/components/comments/comments-container";
import { EditTaskForm } from "@/components/form/edit-task-form";

export default function TaskPage() {
  const router = useRouter();
  const params = useParams();
  const taskId = params.id;

  const [task, setTask] = useState<TaskDetail>();
  const [userAuth, setUser] = useState<UserType>();
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const getTask = async () => {
    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
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
        setTask(parsedResponse.data);
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  const getMe = async () => {
    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.replaceAll('"', "")}`,
      },
    });

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
        setUser({
          email: parsedResponse.data.email,
          id: parsedResponse.data.id,
          UserName: parsedResponse.data.name,
        });
      } else {
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  const revokeUser = async (id: string) => {
    const cachedUsers = task?.users;
    const currentUsers = task?.users;

    const cachedtask: TaskDetail = {
      createdAt: task?.createdAt ?? "",
      description: task?.description ?? "",
      id: task?.id ?? "",
      isCompleted: task?.isCompleted ?? false,
      title: task?.title ?? "",
      updatedAt: task?.updatedAt ?? "",
      users: cachedUsers ?? [],
    };
    const currentask: TaskDetail = {
      createdAt: task?.createdAt ?? "",
      description: task?.description ?? "",
      id: task?.id ?? "",
      isCompleted: task?.isCompleted ?? false,
      title: task?.title ?? "",
      updatedAt: task?.updatedAt ?? "",
      users: currentUsers?.filter((el) => el.id !== id) ?? [],
    };

    setTask(currentask);

    const token = window.localStorage.getItem(tokenId);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tasks/revoke_user/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.replaceAll('"', "")}`,
        },
        body: JSON.stringify({
          taskId: taskId,
          userId: id,
        }),
      }
    );

    if (response.status === 401) {
      localStorage.removeItem(tokenId);
      router.push("login");
    } else {
      const parsedResponse = await response.json();

      if (parsedResponse.success) {
      } else {
        setTask(cachedtask);
        toast.error(parsedResponse.errorMessage);
      }
    }
  };

  const addUser = async (id: string, user: UserTasks) => {
    if (task?.users.some((user) => user.id === id)) {
      toast.error("Este usuario ya forma parte de esta tarea");
      return;
    }

    const cachedUsers = task?.users;
    const currentUsers = task?.users;
    currentUsers?.push(user);

    const cachedtask: TaskDetail = {
      createdAt: task?.createdAt ?? "",
      description: task?.description ?? "",
      id: task?.id ?? "",
      isCompleted: task?.isCompleted ?? false,
      title: task?.title ?? "",
      updatedAt: task?.updatedAt ?? "",
      users: cachedUsers ?? [],
    };
    const currentask: TaskDetail = {
      createdAt: task?.createdAt ?? "",
      description: task?.description ?? "",
      id: task?.id ?? "",
      isCompleted: task?.isCompleted ?? false,
      title: task?.title ?? "",
      updatedAt: task?.updatedAt ?? "",
      users: currentUsers ?? [],
    };

    try {
      setTask(currentask);

      const token = window.localStorage.getItem(tokenId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/add_user/${taskId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.replaceAll('"', "")}`,
          },
          body: JSON.stringify({
            taskId: taskId,
            userId: id,
          }),
        }
      );

      if (response.status === 401) {
        localStorage.removeItem(tokenId);
        router.push("login");
      } else {
        const parsedResponse = await response.json();

        if (parsedResponse.success) {
        } else {
          setTask(cachedtask);
          console.clear();
          console.log(parsedResponse.errorMessage);
          //toast.error(parsedResponse.errorMessage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultDate = new Date().toISOString();

  useEffect(() => {
    if (taskId !== null) {
      getTask();
      getMe();
    }
  }, [taskId]);

  return (
    <main className="relative isolate px-6 pt-14 lg:px-8">
      <div className="px-">
        {task?.users?.some(
          (el) => el.id === userAuth?.id && (el.role === 1 || el.role === 2)
        ) ? (
          <button
            onClick={() => setOpenEdit((prev) => !prev)}
            className="flex mt-4  items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Editar <PencilIcon className="ml-1" width={20} height={20} />
          </button>
        ) : (
          <>
            <button
              disabled
              className="flex mt-4  items-center rounded-md bg-indigo-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              Editar <PencilIcon className="ml-1" width={20} height={20} />
            </button>
            <small className="text-yellow-300">
              No tienes permisos para editar este archivo
            </small>
          </>
        )}
      </div>
      <div>
        <div className="mx-auto max-w-7xl py-16">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                {task?.title}
              </h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="sm:pr-4">
                  <dt className="inline text-gray-500">Creada el</dt>{" "}
                  <dd className="inline text-gray-700">
                    <time dateTime={formatDate(task?.createdAt ?? defaultDate)}>
                      {formatDate(task?.createdAt ?? defaultDate)}
                    </time>
                  </dd>
                </div>
                <div className="mt-2 sm:mt-0 sm:pl-4">
                  <dt className="inline text-gray-500">
                    Ultima vez actualizada el
                  </dt>{" "}
                  <dd className="inline text-gray-700">
                    <time dateTime={formatDate(task?.createdAt ?? defaultDate)}>
                      {formatDate(task?.updatedAt ?? defaultDate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div className="my-4 text-black border-t border-gray-900/5 pt-6 sm:pr-4">
                <h4 className="text-base">Descripción</h4>
                <p className="text-xs mt-1">{task?.description}</p>
              </div>

              <hr />
              <div className="text-black mt-4">
                <h4 className="text-sm">Participantes</h4>
                {task?.users.map((user) => (
                  <UserInTaskHandler
                    key={user.id}
                    user={user}
                    showBtns={task?.users.some(
                      (el) => el.id === userAuth?.id && el.role === 1
                    )}
                    revokeUser={revokeUser}
                  />
                ))}
              </div>
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex mt-4  items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Añadir un participante{" "}
                <PlusCircleIcon className="ml-1" width={20} height={20} />
              </button>
            </div>

            <div className="lg:col-start-3">
              <CommentsContainer
                taskId={task?.id ?? ""}
                userId={userAuth?.id ?? ""}
                userName={userAuth?.UserName ?? ""}
              />

              <Drawer
                open={open}
                setOpen={setOpen}
                title="Añadir un nuevo participante"
              >
                <AddUserToTaskForm
                  currentUserId={userAuth?.id ?? ""}
                  addUser={addUser}
                />
              </Drawer>

              <Drawer
                open={openEdit}
                setOpen={setOpenEdit}
                title="Añadir un nuevo participante"
              >
                <EditTaskForm
                  setOpen={setOpenEdit}
                  taskDescription={task?.description ?? ""}
                  taskTile={task?.title ?? ""}
                />
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
