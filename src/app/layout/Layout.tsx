import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
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
        <div className="flex-1 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
