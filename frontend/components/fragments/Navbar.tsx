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
           
            </div>
          </div>
        )
      </nav>
    </>
  );
  };