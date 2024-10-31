import { type User } from "@junobuild/core-peer";

export type AuthState = {
  loggedIn: boolean;
  data: User | null;
  setLoginDataAction: (data: SetLoginDataActionProps) => void;
};

export type SetLoginDataActionProps = {
  loggedIn: boolean;
  userData: CurrentUser | null;
};
