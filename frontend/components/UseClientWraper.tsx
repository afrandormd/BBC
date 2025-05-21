"use client";

import { usePathname } from "next/navigation";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin"); // Mengecek apakah ini halaman admin

  return (
    <>
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
    </>
  );
}
