import React from "react";
import { Dropdown, dataDropdownType } from "../dropdown/dropdown";
import { TextInput } from "../inputs/text-input";
import { inputClassName } from "../inputs/input-class-constans";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const options: dataDropdownType[] = [
  {
    id: 1,
    name: "Todas",
  },
  {
    id: 2,
    name: "Creadas por mi",
  },
];

export const SearchFilter = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-row my-4 w-full justify-between items-center">
      <Dropdown data={options} />
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Crear tarea <PlusCircleIcon className="ml-1" width={20} height={20} />
      </button>
    </div>
  );
};
