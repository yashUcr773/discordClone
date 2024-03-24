import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

export default function MainPage() {
    return (
        <div>
            <UserButton afterSignOutUrl="/"></UserButton>
            <ModeToggle></ModeToggle>
        </div>
    )
}