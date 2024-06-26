import { IoMdInformationCircleOutline } from "react-icons/io";

export default function Footer() {
    return (
        <footer className="flex gap-2 w-full items-center justify-center px-1 py-2 text-xs dark:text-gray-300">
            <IoMdInformationCircleOutline size={18} /> Note that this isn&apos;t an official website from Square Cloud.
        </footer>
    )
}