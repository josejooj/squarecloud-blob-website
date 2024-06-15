import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import ThemeModeSwitch from "./themeModeSwitch";

export default function Header() {

    return (
        <header className="flex gap-2 w-full max-w-[1200px] items-center justify-between px-1 py-2">
            <Link href="https://squarecloud.app" className="flex items-center gap-2">
                <Image
                    src={`/logo-dark-nobg.png`}
                    width={64}
                    height={64}
                    alt="Square Cloud Logo"
                    className="dark:hidden"
                />
                <Image
                    src="/logo-white-nobg.png"
                    width={64}
                    height={64}
                    alt="Square Cloud Logo"
                    className="hidden dark:block"
                />
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