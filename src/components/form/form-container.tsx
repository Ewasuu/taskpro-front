"use client";
import { BaseSyntheticEvent } from "react";

type FormContainerType = {
  children: React.ReactElement;
  className: string;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
};

export const FormContainer: React.FC<FormContainerType> = ({
  children,
  className = "",
  onSubmit,
}) => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
