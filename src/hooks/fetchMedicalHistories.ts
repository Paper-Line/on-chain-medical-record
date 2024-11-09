"use client";

import { getUserMedicalHistories } from "@/server/controllers/user/medicalHistories";
import { useEffect, useState } from "react";

export const useFetchMedicalHistories = (userCode: string) => {
  const [medicalData, setMedicalData] = useState<any[]>([]);

  const handleCall = async () => {
    const medicalHistories = await getUserMedicalHistories({
      userCode
    });

    setMedicalData(medicalHistories as any);
  };

  useEffect(() => {
    if (userCode) {
      handleCall();
    }
  }, []);

  return { medicalData } as const;
};
