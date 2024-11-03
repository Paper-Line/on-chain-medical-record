"use client";

import { useEffect } from "react";
import { authSubscribe, initSatellite } from "@junobuild/core-peer";
import { redirect } from "next/navigation";

import { Footer } from "@/components/footer";
import { Login } from "@/components/login";

import { bigIntToTimestamp } from "@/utils/general";

import useAuthStore from "@/stores/authStore";
import { getDetailUser, setIdentity } from "@/server/controllers/user/users";

export default function Home() {
  const { setLoginDataAction, data } = useAuthStore();

  useEffect(() => {
    (async () =>
      await initSatellite({
        workers: {
          auth: true
        }
      }))();
  }, []);

  useEffect(() => {
    const sub = authSubscribe(async (user) => {
      if (user && user !== undefined) {
        const createdAt = bigIntToTimestamp(user?.created_at || BigInt(0));
        const updatedAt = bigIntToTimestamp(user?.updated_at || BigInt(0));

        const newData = {
          ...user,
          created_at: createdAt,
          updated_at: updatedAt,
          version: Number(user?.version)
        };
        let userDetailData = undefined;

        const userDetail = await getDetailUser(user?.owner || "");

        if (userDetail) {
          userDetailData = userDetail;
          console.log("🚀 ~ sub ~ userDetailData:", userDetailData);
        } else {
          const response = await setIdentity({ identity: user?.owner || "" });
          if (response) {
            console.log("🚀 ~ sub ~ response:", response);
            userDetailData = response;
          } else {
            console.error("Failed to set identity");
          }
        }

        setLoginDataAction({
          loggedIn: true,
          userData: newData,
          userDetail: userDetailData
        });
      }
    });

    return () => sub();
  }, []);

  useEffect(() => {
    if (data && data !== undefined) redirect("dashboard");
  }, [data]);

  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        <main className="mx-auto max-w-screen-2xl py-16 px-8 md:px-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight md:pt-24">Medical Tracker</h1>
          <Login />
        </main>

        <Footer />
      </div>
    </>
  );
}
