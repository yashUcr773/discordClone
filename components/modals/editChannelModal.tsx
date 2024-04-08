"use client"

import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axios from 'axios';
import { useParams, useRouter } from "next/navigation"
import { useModal } from "@/hooks/use-modal-store"
import { ChannelType } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import queryString from "query-string"
import { useEffect } from "react"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Channel name is required."
    }).refine(name => name !== 'general', { message: "Channel name cannot be 'general'" }),
    type: z.nativeEnum(ChannelType)
});

export default function EditChannelModal() {

    const { isOpen, onClose, type, data } = useModal()
    const router = useRouter()

    const isModalOpen = isOpen && type === 'editChannel'
    const { channel, server } = data;


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: channel?.type || ChannelType.TEXT
        }
    })

    useEffect(() => {
        if (channel) {
            form.setValue('name', channel.name)
            form.setValue('type', channel.type)
        }
    }, [form, channel])

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {

        try {

            const url = queryString.stringifyUrl({
                url: `/api/channels/${channel?.id}`,
                query: {
                    serverId: server?.id
                }
            })

            await axios.patch(url, values)
            form.reset()
            router.refresh()
            onClose()
        } catch (e) {
            console.log(e)
        }
        finally {

        }

    }

    const handleClose = () => {
        form.reset();
        onClose()
    }
     
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="dark:bg-[#1E1F22] bg-[#E3E5E8] text-black dark:text-zinc-300 p-0 border overflow-hidden w-11/12 rounded-lg">

                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Edit Channel
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase text-base font-bold">Channel Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="bg-zinc-400/50 dark:bg-zinc-600/50 border-0 focus-visible:ring-0  focus-visible:ring-offset-0" placeholder="Enter channel name" {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}></FormField>
                            <FormField control={form.control} name="type" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Channel Type</FormLabel>
                                    <Select disabled={isLoading} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-zinc-400/50 dark:bg-zinc-600/50 border-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none">

                                                <SelectValue placeholder="Select a channel type"></SelectValue>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ChannelType).map((type) => (
                                                <SelectItem key={type} value={type} className="capitalize">{type.toLowerCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}>

                            </FormField>
                        </div>
                        <DialogFooter className="px-6 py-4">
                            <Button disabled={isLoading} variant={'primary'}>
                                Update
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}