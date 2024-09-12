export type InterfaceUser = {
  users: GetUser [];
};

type GetUser = {
  email: string;
  password: string;
  role: string;
  customer_uuid: string;
  employee_uuid: string;
};

export interface UserVerification {
  user: User;
  password: string;
  isRefreshToken?: boolean;
}


export type User = {
  role: string;
  employee_uuid: string;
  customer_uuid: string;
  password: string;
};