import { type User } from "@junobuild/core-peer";

export type AuthState = {
  loggedIn: boolean;
  data: any | undefined | null;
  setLoginDataAction: (data: SetLoginDataActionProps) => void;
  resetLoginDataAction: () => void;
};

export type SetLoginDataActionProps = {
  loggedIn: boolean;
  userData: any | undefined | null;
};
