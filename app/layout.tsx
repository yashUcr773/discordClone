import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/components/providers/modal-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import QueryProvider from "@/components/providers/query-provider";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DiscordClone | Your Place to Talk and Hang Out",
    description: "Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(openSans.className, 'bg-white dark:bg-[#313338]')}>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="discord-theme">
                        <SocketProvider>
                            <QueryProvider>
                                <ModalProvider></ModalProvider>
                                {children}
                            </QueryProvider>
                        </SocketProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
