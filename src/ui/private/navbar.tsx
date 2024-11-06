"use client";

import { useEffect, useMemo, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/IC_logo_horizontal.svg";

import Tooltip from "@/components/tooltip";
import Container from "@/components/container";

import { signOut } from "@junobuild/core-peer";

import useAuthStore from "@/stores/authStore";

const NAVBAR_MENU = [
  {
    value: "dashboard"
  },
  {
    value: "subscription"
  },
  {
    value: "account-setting"
  }
];

export default function Navbar() {
  const pathname = usePathname();

  const { data: userData, userDetail, loggedIn, resetLoginDataAction } = useAuthStore();
  console.log("🚀 ~ Navbar ~ userData:", userDetail)

  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  const currentPath: string = useMemo(() => {
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/account-setting") return "account-setting";

    return "";
  }, [pathname]);

  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    await signOut();
    resetLoginDataAction();
  };

  useEffect(() => {
    if (!loggedIn) return redirect("/");
  }, [loggedIn]);

  return (
    <nav className="w-full h-16 bg-white flex items-center justify-between px-5 border-b border-neutral-100">
      <Container>
        {/* Desktop Navbar */}
        <div className="w-full h-full hidden lg:flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image draggable={false} src={Logo} alt="logo" width={125} height={75} />
            </Link>
          </div>
          <div className="flex-1 flex justify-center items-center gap-x-4">
            <NavbarMenu currentPath={currentPath} />
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-6 rounded-[3px]">
              <div className="w-5 h-5 rounded-full bg-blue-800" />
              <div className="h-full flex-1 flex flex-row items-center bg-white/50 px-1">
                <p className="text-sm font-bold mr-4 text-black">{userDetail?.name || "-"}</p>
                <Tooltip
                  contentClassName="top-7 -translate-x-full transform px-4 py-2.5 w-28"
                  content={
                    <div className="w-full flex flex-col space-y-2">
                      <button onClick={handleLogout} className="flex items-center space-x-2">
                        <p className="text-black">Logout</p>
                      </button>
                    </div>
                  }
                >
                  {/* icons chevron down */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="w-full h-full block lg:hidden">
          <div className="w-full flex justify-between items-center">
            <Link href="/" className="w-16 h-16">
              <Image src={Logo} alt="mid-logo" className="w-full h-full" />
            </Link>

            <div className="flex">
              <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
          <MobileNavbarMenu
            showMobileSidebar={showMobileSidebar}
            setShowMobileSidebar={setShowMobileSidebar}
            currentPath={currentPath}
            handleLogout={handleLogout}
          />
        </div>
      </Container>
    </nav>
  );
}

type MobileNavbarMenuProps = {
  showMobileSidebar: boolean;
  setShowMobileSidebar: (value: boolean) => void;
  currentPath: string;
  handleLogout?: () => void;
};

const MobileNavbarMenu = ({ currentPath, showMobileSidebar, setShowMobileSidebar, handleLogout }: MobileNavbarMenuProps) => {
  const { userDetail } = useAuthStore();

  return (
    <div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed mt-0 right-0 w-full h-full bg-opacity-90 bg-black z-20 lg:hidden transition-transform duration-300 ${
          showMobileSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col w-full h-full relative bg-neutral-200">
          <div className="mt-10 w-full max-w-sm ml-auto flex flex-col px-4">
            <div className="w-full">
              <p className="text-sm font-bold text-black">{userDetail ? userDetail?.username : "{username}"}</p>
            </div>

            <div className="w-full h-px bg-neutral-100/50 my-5" />

            <div className="flex flex-col gap-y-4">
              <NavbarMenu currentPath={currentPath} />
            </div>

            <button onClick={handleLogout} className="mt-12 px-4 py-2 bg-black/70 text-red-400 rounded-lg border border-red-600">
              Logout
            </button>
          </div>
          <div className="flex-1" onClick={() => setShowMobileSidebar(false)} />
        </div>
      </div>
    </div>
  );
};

const NavbarMenu = ({ currentPath }: { currentPath: string }) => {
  return NAVBAR_MENU.map((item, index) => {
    const displayName = item.value.replace(/-/g, " ");

    return (
      <NavButton key={index} active={currentPath === item.value} href={`/${item.value}`}>
        {displayName}
      </NavButton>
    );
  });
};

interface NavButtonProps {
  children: React.ReactNode;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

const NavButton = ({ children, href, active, onClick }: NavButtonProps) => {
  return (
    <Link
      href={href}
      className={twMerge(
        "w-full lg:w-fit px-4 py-2 lg:py-1 rounded-lg bg-transparent capitalize border",
        active ? "border-emerald-500" : "border-neutral-200"
      )}
      onClick={onClick}
    >
      <p>{children}</p>
    </Link>
  );
};
