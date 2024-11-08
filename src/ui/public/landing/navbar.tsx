"use client";

import Link from "next/link";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

import { Button, Login } from "@/components";
import { useState } from "react";

const MENU = [
  {
    title: "Home",
    href: "#home"
  },
  {
    title: "Services",
    href: "#about"
  },
  {
    title: "About Us",
    href: "#contact"
  },
  {
    title: "Contact Us",
    href: "#contact"
  }
];

export const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    // desktop navbar
    <>
      <nav className="h-[80px] flex justify-center bg-neutral-50 border-b border-b-neutral-200 shadow-sm px-4">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-20">
            <h1 className="text-3xl font-semibold text-green-main tracking-tight">
              Mediuron
            </h1>
            <ul className="hidden lg:flex space-x-10">
              {MENU.map((item, index) => (
                <Link className="hover:text-green-main transition-all duration-200 ease-in-out" key={index} href={item.href}>
                  <li>{item.title}</li>
                </Link>
              ))}
            </ul>
          </div>
          <div className="hidden lg:flex items-center w-auto space-x-4">
            <Button
              className="bg-transparent border-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-800 hover:border-neutral-200 px-4 w-52 transition-all duration-200 ease-in-out"
              onClick={() => alert("Coming soon")}
            >
              Became a partner
            </Button>
            <Login />
          </div>
          <button className="block lg:hidden p-2" onClick={toggleMobileMenu}>
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </nav>
      {/* mobile navbar */}
      <div className={`lg:hidden fixed top-0 ${showMobileMenu ? "left-0" : "left-[-100%]"}  w-full h-full bg-white z-50 transition-all duration-200 ease-in-out`}>
        <button className="absolute top-0 right-0 p-4 h-[80px]" onClick={toggleMobileMenu}>
          <RxCross1 size={24}/>
        </button>
        <div className="container flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col items-center space-y-4">
            {MENU.map((item, index) => (
              <Link key={index} href={item.href} onClick={toggleMobileMenu}>
                <li>{item.title}</li>
              </Link>
            ))}
          </ul>
          <div className="flex flex-col items-center space-y-4">
            <Button
              className="bg-transparent border-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-800 hover:border-neutral-200 px-4 w-52 transition-all duration-200 ease-in-out"
              onClick={() => alert("Coming soon")}
            >
              Became a partner
            </Button>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};
