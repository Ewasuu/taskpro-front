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

export type UserType = {
    id: string;
    UserName: string;
    email: string;
}

export type CommentType = {
    id: string
    text: string;
    userName: string;
    date: string;
}

export type UserTasks = {
    id: string;
    email: string;
    name: string;
    role: 1|2|3;
  };
  
  
export type TaskDetail = {
    users: UserTasks[];
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
  