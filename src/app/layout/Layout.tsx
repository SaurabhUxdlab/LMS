import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useLocation } from "react-router-dom"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const location = useLocation()

  // Hide sidebar for course player and quiz result
  const isCoursePlayer = location.pathname.startsWith('/course/')

  if (isCoursePlayer) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-12 items-center border-b px-4">
          <SidebarTrigger />
          <h1 className="ml-4 font-semibold">Dashboard</h1>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-[10px] m-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
