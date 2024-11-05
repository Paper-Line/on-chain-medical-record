"use client";

import Container from "@/components/container";
import { TextInput } from "@/components/input";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nik, setNik] = useState<string>("");
  const [age, setAge] = useState<number>(1);
  const [address, setAddress] = useState<string>("");

  return (
    <main>
      <div className="w-full h-full px-5 py-8 bg-neutral-100">
        <Container className="w-full max-w-screen-lg h-72">
          <div className="h-52 bg-[#E6EFFF] py-5 px-14" />
          <div className="-mt-28 flex flex-row items-end gap-x-6 px-14">
            <div className="w-[200px] h-[200px] rounded-3xl bg-white" />
            <div className="pb-2">
              <p className="text-3xl text-neutral-900 font-semibold">{"User Name"}</p>
              <p className="mt-2 text-xs text-neutral-500">Subscriber since 2024</p>
            </div>
          </div>
        </Container>
      </div>

      <div>
        <Container className="max-w-screen-lg bg-white rounded-2xl py-8 px-14">
          <div className="w-full flex flex-row justify-between items-start ">
            <h5 className="font-medium">Account Setting</h5>
          </div>

          <div className="mt-5 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
            <div className="w-full lg:w-1/2">
              <TextInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="w-full lg:w-1/2">
              <TextInput type="text" placeholder="Name" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="mt-5 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
            <div className="w-full lg:w-1/2">
              <TextInput type="text" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)} />
            </div>
            <div className="w-full lg:w-1/2">
              <TextInput type="number" placeholder="Age" value={age} onChange={(e) => setAge(Number(e.target.value))} />
            </div>
          </div>
          <div className="mt-5 w-full flex flex-col lg:flex-row justify-between items-start gap-5">
            <div className="w-full">
              <TextInput type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
