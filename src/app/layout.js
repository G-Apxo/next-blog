"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
      }
    };
    handleRouteChange();
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
