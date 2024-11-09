"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

import Container from "@/components/container";
import { TextInput } from "@/components/input";

import CheckGreenIcon from "@/assets/check-green.svg";
import EditIcon from "@/assets/edit.svg";

import useAuthStore from "@/stores/authStore";
import { getDetailUser, updateProfile } from "@/server/users.service";

export default function Page() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nik, setNik] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [address, setAddress] = useState<string>("");
  const { userDetail } = useAuthStore();

  const handleGetProfile = async () => {
    try {
      const result = await getDetailUser(userDetail.key);
      if (result) {
        setName(result.data.name);
        setEmail(result.data.email);
        setNik(result.data.NIK);
        setAge(result.data.age);
        setAddress(result.data.address);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.log("Failed to get profile", error);
    }
  };

  const handleUpdateProfile = async () => {
    setIsLoadingUpdate(true);
    try {
      await updateProfile(userDetail.key, BigInt(userDetail.version), {
        name,
        email,
        NIK: nik,
        age: Number(age) || 0,
        address
      });
      alert("Profile updated successfully");
    } catch (error) {
      alert("Failed to update profile");
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  useEffect(() => {
    handleGetProfile();
  }, []);

  return (
    <main className="px-2.5 sm:px-5 mt-6 sm:mt-12">
      <Container className="w-full max-w-screen-lg">
        <div className="h-[120px] bg-green-500 py-5 px-14 rounded-[10px]" />
        <div className="-mt-6 h-full flex flex-row items-end gap-x-2 px-4">
          <div className="w-20 h-20 bg-red-200 border-2 border-neutral-100 rounded-full" />
          <div className="-mt-1">
            <p className="text-2xl text-neutral-900 font-semibold">{userDetail?.data?.name || "-"}</p>
            <div className="flex flex-row items-center gap-x-1">
              <Image src={CheckGreenIcon} alt={"check"} width={14} height={14} />
              <p className="text-sm text-neutral-500">Subscriber since 2024</p>
            </div>
          </div>
        </div>
      </Container>

      <Container className="mt-10 w-full max-w-screen-lg bg-white rounded-xl py-5 px-3">
        <div className="w-full flex flex-row justify-between items-center">
          <h5 className="font-medium">Identity Details</h5>
          <button disabled={isLoadingUpdate} onClick={() => setEditMode(true)} className={editMode ? "hidden" : "block"}>
            <Image src={EditIcon} alt={"check"} width={16} height={16} />
          </button>
        </div>

        <div className="mt-5 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-1/2">
            <TextInput type="text" label="Name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="w-full lg:w-1/2">
            <TextInput type="text" label="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div className="mt-5 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="w-full lg:w-1/2">
            <TextInput type="text" label="NIK" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)} />
          </div>
          <div className="w-full lg:w-1/2">
            <TextInput type="number" label="Age" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
        </div>
        <div className="mt-5 w-full ">
          <TextInput type="text" label="Address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div
          className={twMerge(
            "mt-4 mx-auto w-full sm:w-[300px] flex flex-row gap-x-5 overflow-hidden transition-all duration-500",
            editMode ? "opacity-100" : "opacity-0 h-px"
          )}
        >
          <button
            className="w-1/2 h-10 px-4 bg-red-400/20 text-red-600 text-lg font-medium border border-red-300 rounded-full"
            onClick={() => setEditMode(false)}
            disabled={isLoadingUpdate}
          >
            Cancel
          </button>
          <button
            className="w-1/2 h-10 px-4 bg-green-400/20 text-green-600 text-lg font-medium border border-green-300 rounded-full"
            onClick={handleUpdateProfile}
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate ? "Loading..." : "Save"}
          </button>
        </div>
      </Container>
    </main>
  );
}
