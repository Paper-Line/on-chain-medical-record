"use client";

import { useEffect, useMemo, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/IC_logo_horizontal.svg";

import Tooltip from "./tooltip";
import Container from "@/components/container";

import { signOut } from "@junobuild/core-peer";

import useAuthStore from "@/stores/authStore";

export default function Navbar() {
  const pathname = usePathname();

  const { data: userData, loggedIn, resetLoginDataAction } = useAuthStore();

  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);

  const activeButton = useMemo(() => {
    if (pathname === "/dashboard") return "dashboard";

    return "";
  }, [pathname]);

  const handleLogout = async () => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    await signOut();
    resetLoginDataAction();
  };

  useEffect(() => {
    if (!userData || userData === undefined) return redirect("/");
  }, [userData]);

  return (
    <nav className="flex items-center justify-between w-full h-20 px-6 bg-white/10">
      <Container>
        {/* Desktop Navbar */}
        <div className="w-full h-full hidden lg:flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Image draggable={false} src={Logo} alt="logo" width={75} height={75} />
            </Link>
            <div className="flex items-center ml-12 space-x-4">
              <NavButton active={activeButton === "dashboard"} href="/dashboard">
                Dashboard
              </NavButton>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-9 flex items-center ml-6 rounded-[3px]">
              <div className="w-5 h-5 rounded-full bg-blue-800" />
              <div className="h-full flex-1 flex flex-row items-center bg-white/50 px-1">
                <p className="text-sm font-bold mr-4 text-black">{"userDetail?.username"}</p>
                <Tooltip
                  contentClassName="top-7 -translate-x-full transform px-4 py-2.5 w-28"
                  content={
                    <div className="w-full flex flex-col space-y-2">
                      <button onClick={handleLogout} className="flex items-center space-x-2">
                        <p className="text-white/75">Logout</p>
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
            activeButton={activeButton}
            handleLogout={handleLogout}
          />
        </div>
      </Container>
    </nav>
  );
}

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
      className={`w-auto px-4 py-2 border-b border-sky-400
        ${active ? "text-accent-1 font-bold" : "bg-transparent text-white/50"}
      `}
      onClick={onClick}
    >
      <p>{children}</p>
    </Link>
  );
};

type MobileNavbarMenuProps = {
  showMobileSidebar: boolean;
  setShowMobileSidebar: (value: boolean) => void;
  activeButton: string;
  handleLogout?: () => void;
};

const MobileNavbarMenu = ({ activeButton, showMobileSidebar, setShowMobileSidebar, handleLogout }: MobileNavbarMenuProps) => {
  const handleClick = () => {
    setShowMobileSidebar(false);
  };

  return (
    <div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed mt-2 right-0 w-full h-full bg-opacity-90 bg-black z-20 lg:hidden transform transition-transform duration-1000 ${
          showMobileSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col w-full h-full relative bg-indigo-900/50">
          <div className="mt-8 w-full max-w-sm ml-auto flex flex-col px-6">
            <div className="w-full h-9 flex items-center rounded-[3px] overflow-hidden">
              <Image src={Logo} alt="wallet" width={42} height={42} />
              <div className="h-full flex-1 flex flex-row justify-between items-center bg-white/50 px-1">
                <p className="text-sm font-bold text-black">{"userDetail?.username"}</p>
              </div>
            </div>
            <div className="w-full mt-4 ">
              <label className="text-white/50">Balance</label>
              <div className="mt-1 w-full flex items-center">
                <p className="ml-1 text-xl">123123</p>
              </div>
            </div>

            <div className="w-full h-px bg-white/20 my-8" />

            <div className="flex flex-col space-y-4">
              <NavButton active={activeButton === "cashout"} onClick={handleClick} href="/cashout">
                Cashout
              </NavButton>
              <NavButton active={activeButton === "cashout-history"} onClick={handleClick} href="/cashout-history">
                Cashout History
              </NavButton>
            </div>

            <button onClick={handleLogout} className="mt-16 px-4 py-2 text-red-400 border border-red-400 rounded">
              Logout
            </button>
          </div>
          <div className="flex-1" onClick={() => setShowMobileSidebar(false)} />
        </div>
      </div>
    </div>
  );
};
