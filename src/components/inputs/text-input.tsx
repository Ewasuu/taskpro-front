"use client";
import React from "react";
import { inputClassName, labelClassName } from "./input-class-constans";

type TextInputType = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText?: string;
  labelClassname?: string;
  divClassName?: string;
  errorMessage?: string;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputType>(
  (
    {
      labelText = "",
      labelClassname = labelClassName,
      className = inputClassName,
      divClassName = "",
      errorMessage,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className={divClassName}>
        <label htmlFor={id} className={labelClassname}>
          {labelText}
        </label>
        <div className="mt-2">
          <input ref={ref} {...props} id={id} className={className} />
          {errorMessage && (
            <span className="text-xs text-red-600">{errorMessage}</span>
          )}
        </div>
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export { TextInput };
