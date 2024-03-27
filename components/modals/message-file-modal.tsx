"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import FileUpload from "../file-upload"
import axios from 'axios';
import { useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"
import queryString from "query-string"

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required."
    })
});


export default function MessageFileModal() {

    const { isOpen, onClose, type, data } = useModal()

    const isModalOpen = isOpen && type === 'messageFile'

    const router = useRouter()

    const { apiUrl, query } = data


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            const url = queryString.stringifyUrl({
                url: apiUrl || "",
                query
            })

            await axios.post(url, { ...values, content: values.fileUrl })
            form.reset()
            handleClose()

        } catch (e) {
            console.log(e)
        }
        finally {

        }

    }

    const handleClose = () => {
        form.reset()
        onClose()

    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-gray-200 text-black p-0 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add an Attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as message
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="fileUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload endpoint="messageFile" value={field.value} onChange={field.onChange}></FileUpload>
                                        </FormControl>
                                    </FormItem>
                                )}></FormField>
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant={'primary'}>
                                Send
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}