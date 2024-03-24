interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="flex flex-row w-full h-full items-center justify-center">
            {children}
        </div>
    );
}
