"use client";
import React from "react";
import Link from "next/link";

type LogoType = {
  className?: string;
  withUrl?: boolean;
};

export const Logo: React.FC<LogoType> = ({ className, withUrl = true }) => {
  return (
    <Link className={className} href={"/"}>
      <div>
        <p className="text-indigo-600 font-bold text-center">
          Task{" "}
          <span className="bg-black rounded-md text-yellow-400 p-1 text-xs">
            PRO
          </span>
        </p>
      </div>
    </Link>
  );
};
