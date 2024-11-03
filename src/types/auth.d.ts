import { type User } from "@junobuild/core-peer";

export type AuthStore = {
  loggedIn: boolean;
  data: any | undefined | null;
  userDetail: any | undefined | null;
  setLoginDataAction: (data: SetLoginDataActionProps) => void;
  resetLoginDataAction: () => void;
};

export type SetLoginDataActionProps = {
  loggedIn: boolean;
  userData: any | undefined | null;
  userDetail: any | undefined | null;
};
