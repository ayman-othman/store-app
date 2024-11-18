import { Roles } from "../types/role.type";

export interface ILoginRequest {
  userName: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  password: string;
  role:Roles
}
