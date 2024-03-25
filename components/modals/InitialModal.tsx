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

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
});


export default function InitialModal() {

    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {

        setMounted(true)

        return () => {
            setMounted(false)
        }
    }, [])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = (values: z.infer<typeof formSchema>) => {

        try {

            axios.post("/api/servers", values)
            form.reset()
            router.refresh()
            window.location.reload()

        } catch (e) {
            console.log(e)
        }
        finally {

        }

    }

    if (!mounted) {
        return null
    }

    return (
        <Dialog open>
            <DialogContent className="bg-gray-200 text-black p-0 border overflow-hidden w-11/12 rounded-lg">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Give your server a personality with a name and an image. You can always change it later.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload endpoint="serverImage" value={field.value} onChange={field.onChange}></FileUpload>
                                        </FormControl>
                                    </FormItem>
                                )}></FormField>
                            </div>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="uppercase test-xs font-bold text-zinc-500 dark:text-secondary/70"></FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" placeholder="Enter server name" {...field}></Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )}></FormField>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} variant={'primary'}>
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}