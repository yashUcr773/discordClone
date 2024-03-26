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
            <DialogContent className="bg-gray-200 text-black p-0 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite your friends
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}>
                        </Input>
                        <Button size={'icon'} className="bg-gray-200" onClick={onCopy} disabled={isLoading}>
                            {copied ?
                                <Check className="w-4 h-4"></Check> :
                                <Copy className="w-4 h-4"></Copy>
                            }
                        </Button>
                    </div>
                    <Button variant={'link'} size={'sm'} className="text-xs text-zinc-500 mt-4" disabled={isLoading} onClick={onNew}>
                        Generate a new link
                        <RefreshCw className="w-4 h-4 ml-2"></RefreshCw>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}