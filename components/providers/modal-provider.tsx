'use client'

import { useEffect, useState } from "react"
import CreateServerModal from "../modals/createServerModal"
import InviteModal from "../modals/inviteModal"
import EditServerModal from "../modals/editServerModal"
import ManageMembersModal from "../modals/manageMembersModal"
import CreateChannelModal from "../modals/createChannelModal"
import LeaveServerModal from "../modals/leaveServerModal"
import DeleteServerModal from "../modals/deleteServerModal"
import DeleteChannelModal from "../modals/deleteChannelModal"
import EditChannelModal from "../modals/editChannelModal"
import MessageFileModal from "../modals/message-file-modal"

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <MessageFileModal></MessageFileModal>
            <EditChannelModal></EditChannelModal>
            <DeleteServerModal></DeleteServerModal>
            <DeleteChannelModal></DeleteChannelModal>
            <LeaveServerModal></LeaveServerModal>
            <CreateChannelModal></CreateChannelModal>
            <ManageMembersModal></ManageMembersModal>
            <CreateServerModal></CreateServerModal>
            <EditServerModal></EditServerModal>
            <InviteModal></InviteModal>
        </>
    )
}