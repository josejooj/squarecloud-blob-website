'use client';
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import ThemeModeSwitch from "./themeModeSwitch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Footer() {

    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => { setMounted(true) }, [])

    return (
        <header className="flex gap-2 w-full max-w-[1200px] items-center justify-between px-1 py-2">
            <Link href="https://squarecloud.app" className="flex items-center gap-2">
                <Image src={`/logo-${mounted && theme === 'dark' ? "white" : 'black'}-nobg.png`} width={64} height={64} alt="Square Cloud Logo" />
                <h1 className="text-2xl font-bold">Blob</h1>
            </Link>
            <article className="flex gap-4 items-center">
                <Link
                    href="https://github.com/josejooj/squarecloud-blob-website"
                    className="hover:opacity-70 duration-200"
                >
                    <FaGithub size={32} />
                </Link>
                <ThemeModeSwitch />
            </article>
        </header>
    )

}