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
