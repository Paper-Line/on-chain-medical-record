import { create } from "zustand";
import { persist, subscribeWithSelector, createJSONStorage, StateStorage, PersistStorage } from "zustand/middleware";

import { decrypt, encrypt, parser } from "@/utils/general";

import type { AuthState, SetLoginDataActionProps } from "@/types/auth";

const initialState = {
  loggedIn: false,
  data: undefined
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
    const encrypted = encrypt(JSON.stringify(typeof value === "bigint" ? value.toString() : value)) || "";
    localStorage.setItem(key, encrypted);
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
};

const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        ...initialState,
        setLoginDataAction: (data: SetLoginDataActionProps) => {
          set({
            loggedIn: data.loggedIn,
            data: data
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
        partialize: (state: AuthState) => {
          const { loggedIn, data } = state;
          return { loggedIn, data };
        }
      }
    )
  )
);

export default useAuthStore;
