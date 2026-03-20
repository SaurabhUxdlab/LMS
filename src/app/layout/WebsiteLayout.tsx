
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import type { ReactNode } from "react";

interface WebsiteLayoutProps {
  children?: ReactNode;
}

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
    </div>
  )
}