import { NextPage } from 'next';

export type RegisterType = {
    UserName: string;
    Email: string;
    Password: string;
}

export type LoginType = {
    Email: string;
    Password: string;
}

export type NextPageWithAuth = NextPage & {
    AuthRequired: boolean;
}

export type TaskType = {
    createdAt: string;
    description: string;
    id: string;
    isCompleted: boolean;
    title: string;
    updatedAt: string;
    role: number
  };