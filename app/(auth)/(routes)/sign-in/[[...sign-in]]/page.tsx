import DemoUserCreds from "@/app/(auth)/_components/DemoUserCreds";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function SignupPage() {
	return (
		<div className="relative flex flex-row items-center justify-center gap-0 gap-x-0">
			<SignIn></SignIn>
			<ClerkLoaded>
				<HoverCard>
					<HoverCardTrigger>
						<div className="absolute -right-[50px] rotate-90 cursor-pointer bg-rose-500 px-4 py-2 rounded-md">
							Demo User
						</div>
					</HoverCardTrigger>
					<HoverCardContent className="w-fit bg-white dark:bg-[#2c2e32] border border-transparent shadow-md">
						<DemoUserCreds></DemoUserCreds>
					</HoverCardContent>
				</HoverCard>
			</ClerkLoaded>
		</div>
	);
}
