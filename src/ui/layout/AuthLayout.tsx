import { type ReactNode, createContext, useEffect, useState } from "react";
import { authSubscribe, type User } from "@junobuild/core-peer";

import { Logout } from "@/components/logout";
import { Login } from "@/components/login";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthContext = createContext<{ user: User | undefined | null }>({ user: undefined });

function AuthLayout({ children }: AuthLayoutProps) {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  console.log("🚀 ~ AuthLayout ~ user:", user);

  useEffect(() => {
    const sub = authSubscribe((user) => setUser(user));

    return () => sub();
  }, []);

  return (
    <div className="w-full h-full min-h-screen p-5 flex flex-col items-center justify-center">
      <AuthContext.Provider value={{ user }}>
        {user !== undefined && user !== null ? (
          <div>
            {children}
            <Logout />
          </div>
        ) : (
          <div className="w-64">
            <Login />
          </div>
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default AuthLayout;
