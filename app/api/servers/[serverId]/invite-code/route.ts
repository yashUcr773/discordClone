import { currentProfile } from "@/lib/current-profile"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"
import { v4 as uuid } from "uuid"


export async function PATCH(req: Request, { params }: { params: { serverId: string } }) {

    try {

        const profile = await currentProfile()

        if (!profile) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params?.serverId) {
            return new NextResponse('Server Id Missing', { status: 400 })
        }

        const server = await prisma.server.update({
            where: {
                id: params?.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: uuid()
            }
        })

        return NextResponse.json(server)

    } catch (e) {
        console.log(e)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}