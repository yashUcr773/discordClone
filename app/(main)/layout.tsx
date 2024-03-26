import NavigationSidebar from "@/components/navigations/navigation-sidebar"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar></NavigationSidebar>
            </div>
            <main className="md:pl-[72px] h-full">
                {children}
            </main>
        </div>
    )
}