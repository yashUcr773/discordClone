import { Separator } from "@/components/ui/separator"

export default function DemoUserCreds() {
	return (
		<div className="flex flex-col items-center justify-center text-sm p-2 w-[240px] gap-y-4">
			<div>Want to just demo the app? Use Creds.</div>
			<div className="flex flex-col items-start w-full gap-y-2">
				<div>User 1</div>
				<div>Email: demouser@mailsac.com</div>
				<div>Password: demo_user_1</div>
			</div>
            <Separator className="border border-white w-full"></Separator>
			<div className="flex flex-col items-start w-full gap-y-2">
				<div>User 2</div>
				<div>Email: demouser2@mailsac.com</div>
				<div>Password: demo_user_2</div>
			</div>
		</div>
	);
}
