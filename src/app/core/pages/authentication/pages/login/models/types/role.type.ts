import { ROLES } from "../const/login.const";

export type Roles = (typeof ROLES)[keyof typeof ROLES];
