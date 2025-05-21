"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../elements/button";

// List Menu Items
const links = [
  { id: 1, href: "/", text: "Beranda" },
  { id: 2, href: "/location", text: "Lokasi" },
  { id: 3, href: "/allproducts", text: "Semua Produk" },
  { id: 4, href: "/about", text: "Tentang Kami" },
];
const Navbar = () => {
  // Menu Function
  const [isClick, setisClick] = useState(false);

  const toggleNavbar = () => {
    setisClick(!isClick);
  };
  return (
    <>
      <nav className="bg-gradient-to-l from-[#4F2F16] to-[#FFCC33] fixed top-0 left-0 w-full z-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-white">
                  <Image
                    src="/logo-askhajaya.png"
                    alt="logo askha jaya"
                    width={70}
                    height={70}
                  />
                </Link>
              </div>
            </div>
            {/* Menu */}
            <div className="hidden md:block">
              <div className="flex items-center ml-4 space-x-4">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="p-2 text-primary rounded-lg hover:bg-primary hover:text-secondary"
                  >
                    {link.text}
                  </Link>
                ))}
                {/* tombol login */}
                <Button
                  asChild
                  className="text-secondary font-semibold hover:bg-secondary hover:text-primary"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
            {/* Toggler Menu */}
            <div className="flex items-center md:hidden">
              <button
                className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleNavbar}
              >
                {isClick ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        )
      </nav>
    </>
  );
};
