"use client"

import { useState } from "react"
import ActionTooltip from "../action-tooltip"
import { Video, VideoOff } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import queryString from "query-string"

export default function ChatVideoButton() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const isVideo = searchParams?.get('video')


    const Icon = isVideo ? VideoOff : Video;
    const toolTipLabel = isVideo ? "End Video Call" : "Start Video Call";

    const handleClick = () => {
        const url = queryString.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined : true
            }
        }, { skipNull: true })
        router.push(url)
    }

    return (
        <ActionTooltip side="bottom" label={toolTipLabel}>
            <button onClick={handleClick} className="hover:opacity-75 transition mr-4">
                <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400"></Icon>
            </button>
        </ActionTooltip>
    )
}