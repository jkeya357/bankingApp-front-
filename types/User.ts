import { Account } from "./Account";

export interface getUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  account: Account[];
  createdAt: Date;
}

export interface createUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserRequest{
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FieldChange{
  oldValue: unknown;
  newValue: unknown;
  updatedAt: Date
}

export interface updateUserResponse{
  updateField: Record<string, FieldChange>
}

export interface updateUser{
  id:string;
  requestBody:{
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profilePicture: string;
  }
}
