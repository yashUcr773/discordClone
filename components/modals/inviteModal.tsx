"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Check, Copy, RefreshCw } from "lucide-react"
import { useOrigin } from "@/hooks/use-origin"
import { useState } from "react"
import axios from "axios"

export default function InviteModal() {

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'invite';
    const origin = useOrigin();
    const { server } = data;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const handleClose = () => {
        onClose();
    }

    const onNew = async () => {
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen('invite', { server: response.data })

        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:bg-[#1E1F22] bg-[#E3E5E8] text-black dark:text-zinc-300 p-0 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite your friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-base font-bold  ">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input disabled={isLoading} className="bg-zinc-400/50 dark:bg-zinc-600/50 border-0 focus-visible:ring-0  focus-visible:ring-offset-0"
                            value={inviteUrl}>
                        </Input>
                        <Button size={'icon'} className="bg-gray-200" onClick={onCopy} disabled={isLoading}>
                            {copied ?
                                <Check className="w-4 h-4"></Check> :
                                <Copy className="w-4 h-4"></Copy>
                            }
                        </Button>
                    </div>
                    <Button variant={'link'} size={'sm'} className="text-base  mt-4" disabled={isLoading} onClick={onNew}>
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"></RefreshCw>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}