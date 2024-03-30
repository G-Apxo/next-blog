"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        router.push("/login");
      } else {
        console.log("token", token);
      }
    };
    handleRouteChange();
  }, [router]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
