import { create } from "zustand";
import { persist, subscribeWithSelector, PersistStorage } from "zustand/middleware";

import { decrypt, encrypt, parser } from "@/utils/general";

import type { AuthStore, SetLoginDataActionProps } from "@/types/auth";

const initialState = {
  loggedIn: false,
  data: undefined,
  userDetail: undefined
};

export const storage: PersistStorage<any> = {
  getItem(key: string): any | undefined {
    const value = localStorage.getItem(key);

    if (!value) return;

    const decryptedValue = decrypt(value);

    if (!decryptedValue) return;

    const data = parser(decryptedValue);

    return data;
  },

  setItem(key: string, value: any): void {
    const encrypted = encrypt(JSON.stringify(value)) || "";
    localStorage.setItem(key, encrypted);
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
};

const useAuthStore = create<AuthStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...initialState,
        setLoginDataAction: (data: SetLoginDataActionProps) => {
          set({
            loggedIn: data.loggedIn,
            data: data.userData,
            userDetail: data.userDetail
          });
        },
        resetLoginDataAction: () => {
          set({
            loggedIn: false,
            data: undefined
          });
        }
      }),
      {
        name: "medrec-icp",
        storage,
        partialize: (state: AuthStore) => {
          const { loggedIn, data, userDetail } = state;
          return { loggedIn, data, userDetail };
        }
      }
    )
  )
);

export default useAuthStore;
