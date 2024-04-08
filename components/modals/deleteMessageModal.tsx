"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"
import queryString from "query-string"

export default function DeleteMessageModal() {

    const [isLoading, setIsLoading] = useState(false);

    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === 'deleteMessage';
    const { apiUrl, query } = data;

    const handleClose = () => {
        onClose();
    }

    const onConfirmLeave = async () => {
        try {
            setIsLoading(true)

            const url = queryString.stringifyUrl({
                url: apiUrl || "",
                query: query
            })

            await axios.delete(url)
            onClose()
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
                        Delete Message
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-200">
                        Are you sure you want to do this?
                        <br></br>
                        The message will be permanently deleted.
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