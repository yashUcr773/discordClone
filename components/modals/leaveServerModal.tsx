"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function LeaveServerModal() {

    const [isLoading, setIsLoading] = useState(false);

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'leaverServer';
    const { server } = data;
    const router = useRouter()

    const handleClose = () => {
        onClose();
    }

    const onConfirmLeave = async () => {
        try {
            setIsLoading(true)
            await axios.patch(`/api/servers/${server?.id}/leave`)
            onClose()
            router.refresh()
            router.push("/")
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-gray-200 text-black p-0 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Leave Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to leave <span className="font-semibold text-indigo-500">{server?.name}?</span>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="bg-gray-100 px-6 py-4 ">
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