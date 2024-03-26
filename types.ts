import { Member, Profile, Server } from "@prisma/client"

export type ServerMembersProfiles = Server & {
    members: (Member & { profile: Profile })[]
}