"use client"

import { ServerMembersProfiles } from "@/types";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../user-avatar";
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import qs from 'query-string'
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500"></ShieldCheck>,
    'ADMIN': <ShieldAlert className="h-4 w-4 text-rose-500"></ShieldAlert>
}

export default function ManageMembersModal() {

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'manageMembers';
    const { server } = data as { server: ServerMembersProfiles };
    const [loadingId, setLoadingId] = useState("")
    const router = useRouter()

    const handleClose = () => {
        onClose();
    }

    const onRoleChange = async (memberId: string, role: MemberRole) => {
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            })

            const response = await axios.patch(url, { role })
            router.refresh()
            onOpen('manageMembers', { server: response.data })
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingId("")
        }
    }

    const onKick = async (memberId: string) => {
        try {
            setLoadingId(memberId)
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server.id,
                }
            })

            const response = await axios.delete(url)
            router.refresh()
            onOpen('manageMembers', { server: response.data })
        } catch (e) {
            console.log(e)
        } finally {
            setLoadingId("")
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:bg-[#1E1F22] bg-[#E3E5E8] text-black dark:text-zinc-300 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Manage Members
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-200">
                        {server?.members?.length} members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map(member => (
                        <div key={member.id} className="flex items-center gap-x-2 mb-6">
                            <UserAvatar src={member.profile.imageUrl}></UserAvatar>
                            <div className="flex flex-col gap-y-1">
                                <div className="text-base font-semiboldflex flex items-center gap-x-1">
                                    {member.profile.name}
                                    {roleIconMap[member.role]}
                                </div>
                                <p className="text-base text-zinc-400/90">
                                    {member.profile.email}
                                </p>
                            </div>
                            {server.profileId !== member.profileId && loadingId !== member.id && (
                                <div className="ml-auto">
                                    <DropdownMenu>

                                        <DropdownMenuTrigger>
                                            <MoreVertical className="h-4 w-4 text-zinc-500"></MoreVertical>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent side="left">

                                            <DropdownMenuSub>

                                                <DropdownMenuSubTrigger className="flex items-center">
                                                    <ShieldQuestion className="w-4 h-4 mr-2"></ShieldQuestion>
                                                    <span>Role</span>
                                                </DropdownMenuSubTrigger>

                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, MemberRole.GUEST)}>
                                                            <Shield className="h-4 w-4 mr-2"></Shield>
                                                            Guest {member.role === MemberRole.GUEST && (<Check className="h-4 2-4 ml-auto"></Check>)}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => onRoleChange(member.id, MemberRole.MODERATOR)}>
                                                            <ShieldCheck className="h-4 w-4 mr-2"></ShieldCheck>
                                                            Moderator {member.role === MemberRole.MODERATOR && (<Check className="h-4 2-4 ml-auto"></Check>)}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>

                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator></DropdownMenuSeparator>
                                            <DropdownMenuItem onClick={() => onKick(member.id)}>
                                                <Gavel className="h-4 w-4 mr-2"></Gavel>
                                                Kick
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>

                                    </DropdownMenu>
                                </div>
                            )}
                            {loadingId === member.id && (
                                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4"></Loader2>
                            )}
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}