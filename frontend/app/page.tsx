'use client'
import { useEffect, useState } from "react";
import LoginPage from "./login/page";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
      const token = localStorage.getItem('token');
      setIsConnected(!!token);
    });

  return (
    <>
    {isConnected &&
    <Dashboard />}
    {!isConnected &&
          <LoginPage  />}
    </>
  );
}
