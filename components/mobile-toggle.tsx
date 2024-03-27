import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import NavigationSidebar from "./navigations/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";

interface MobileToggleProps {
    serverId: string
}

export default function MobileToggle({ serverId }: MobileToggleProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'ghost'} size={'icon'} className="md:hidden">
                    <Menu></Menu>
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-0 flex gap-0">
                <div className="w-[72px]">
                    <NavigationSidebar></NavigationSidebar>
                </div>
                <ServerSidebar serverId={serverId} ></ServerSidebar>
            </SheetContent>
        </Sheet>
    )
}