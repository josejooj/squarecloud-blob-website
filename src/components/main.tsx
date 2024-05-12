import React from "react";

export default function Main({ children, className }: { children: React.ReactNode, className: string }) {
    return (
        <main className={"flex-1 w-full max-w-[1200px] px-2 " + className}>
            {children}
        </main>
    );
}