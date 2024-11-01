import { type ReactNode, createContext, useEffect, useState } from "react";
import { authSubscribe, type User } from "@junobuild/core-peer";

import { Logout } from "@/components/logout";
import { Login } from "@/components/login";

import { getDetailUser, setIdentity } from "@/server/controllers/user/users";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthContext = createContext<{ user: User | undefined | null }>({ user: undefined });

function AuthLayout({ children }: AuthLayoutProps) {
  const [user, setUser] = useState<User | undefined | null>(undefined);
  const [userPrifile, setUserProfile] = useState(undefined);

  useEffect(() => {
    const sub = authSubscribe(async (user) => {
      // test setIdentity
      if (user?.owner) {
        let profile = await getDetailUser(user?.owner);
        if (profile) {
          setUserProfile(profile as any);
        } else {
          const response = await setIdentity({ identity: user.owner });
          if (response) {
            setUserProfile(response as any);
          } else {
            console.error("Failed to set identity");
          }
        }
      }
      setUser(user);
    });

    return () => sub();
  }, []);

  console.log("userProfile", userPrifile);

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
