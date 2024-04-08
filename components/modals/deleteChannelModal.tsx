"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { ChannelType } from "@prisma/client"
import { Hash, Mic, Video } from "lucide-react"
import queryString from "query-string"

const iconMap = {
    [ChannelType.TEXT]: <Hash className="inline-block mr-1 w-4 h-4 "></Hash>,
    [ChannelType.VIDEO]: <Video className="inline-block mr-1 w-4 h-4 "></Video>
}

export default function DeleteChannelModal() {

    const [isLoading, setIsLoading] = useState(false);

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deleteChannel';
    const { server, channel } = data;
    const router = useRouter()

    const handleClose = () => {
        onClose();
    }

    const onConfirmLeave = async () => {
        try {
            setIsLoading(true)

            const url = queryString.stringifyUrl({
                url: `/api/channels/${channel?.id}/`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.delete(url)
            onClose()
            router.refresh()
            router.push(`/servers/${server?.id}`)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:bg-[#1E1F22] bg-[#E3E5E8] text-black dark:text-zinc-300 p-0 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Channel
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-200">
                        Are you sure you want to do this?
                        <br></br>
                        <span className="font-semibold text-indigo-500">{iconMap[channel?.type!]}{channel?.name}</span> will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className=" px-6 py-4 ">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={() => onClose()} variant={'ghost'}>
                            Cancel
                        </Button>
                        <Button disabled={isLoading} onClick={() => onConfirmLeave()} variant={'primary'}>
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}