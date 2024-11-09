import { redirect } from "next/navigation";
import { useEffect } from "react";
import { authSubscribe, initSatellite } from "@junobuild/core-peer";

import CONFIG from "@/config";

import { bigIntToTimestamp } from "@/utils/general";
import useAuthStore from "@/stores/authStore";
import { getDetailUser, setIdentityAsUser } from "@/server/users.service";

export default function useAuth() {
  const { setLoginDataAction, data } = useAuthStore();

  useEffect(() => {
    (async () =>
      await initSatellite({
        satelliteId: CONFIG.sateliteId,
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
          const newDetailData = {
            ...user,
            created_at: bigIntToTimestamp(userDetail?.created_at || BigInt(0)),
            updated_at: bigIntToTimestamp(userDetail?.updated_at || BigInt(0)),
            version: Number(userDetail?.version)
          };

          userDetailData = newDetailData;
        } else {
          setIdentityAsUser(user?.owner || "")
            .then((response) => {
              userDetailData = response;
            })
            .catch(() => {
              console.error("Failed to set identity");
            });
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
}
