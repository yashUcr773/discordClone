import { initialProfile } from "@/lib/initialProfile"
import { prisma } from '@/lib/db'
import { redirect } from "next/navigation"

export default async function SetupPage() {

    const profile = await initialProfile()
    const server = await prisma.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })

    if (server) {
        return redirect(`/servers/${server.id}`)
    }

    return (
        <div>Create a server</div>
    )
}