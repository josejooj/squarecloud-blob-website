import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { IoServerSharp } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import prettyBytes from "pretty-bytes";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import crypto from 'crypto';
import Image from "next/image";
import { FaAddressCard } from "react-icons/fa";

interface CardProps {
    title: string,
    icon: IconType,
    value: string,
    description: string
    tooltip?: string
}

function Card({ title, icon: Icon, description, value, tooltip }: CardProps) {
    return (
        <section className="p-2 rounded-md border-2 ">
            <div className="flex items-center justify-between pb-2">
                <nav className="flex items-center gap-2">
                    <Icon size={18} />
                    <h1 className="font-medium text-lg">{title}</h1>
                </nav>
                <h3 className="text-sm">{value}</h3>
            </div>
            <div className="w-full flex justify-between">
                <h5 className="text-sm text-gray-400">{description}</h5>
                {tooltip && (
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger className="dark:text-gray-300 text-gray-600"><IoMdInformationCircleOutline size={24} /></TooltipTrigger>
                            <TooltipContent className="dark:bg-gray-700 dark:text-white border">{tooltip}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        </section>
    )
}

export function UserSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <nav className="flex gap-4">
                <Skeleton className="rounded-lg w-16 h-16"/>
                <section className="flex flex-col gap-2">
                    <Skeleton className="w-32 h-8" />
                    <Skeleton className="w-64 h-6" />
                </section>
            </nav>
            <nav className="grid md:grid-cols-3 w-full gap-2 h-20">
                <Skeleton className="h-full" />
                <Skeleton className="h-full" />
                <Skeleton className="h-full" />
            </nav>
        </div>
    )
}

export async function User() {

    const cookie = cookies();
    const res = await fetch("https://api.squarecloud.app/v2/user", {
        headers: { Authorization: cookie.get("apikey")?.value! }
    });

    if (res.status !== 200) {
        cookie.delete("apikey");
        redirect("/login");
    }

    const user = await res.json().then(r => r.response.user);

    const stats_res = await fetch("https://blob.squarecloud.app/v1/account/stats", {
        headers: { Authorization: cookie.get("apikey")?.value! }
    });

    const status = await stats_res.json().then(r => r.response) || {};
    const user_avatar_hash = crypto.createHash("sha256").update(user?.email?.trim().toLowerCase()).digest("hex");

    return (
        <article className="flex flex-col gap-4">
            <section className="flex items-center gap-4">
                <Image
                    src={`https://gravatar.com/avatar/${user_avatar_hash}?d=mp`}
                    width={64}
                    height={24}
                    alt="Profile picture"
                    className="rounded-lg"
                />
                <section className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl">{user.tag}</h1>
                    <div className="flex items-center gap-2 dark:text-gray-300 text-gray-700">
                        <FaAddressCard />
                        <h3 className="text-sm font-medium dark:text-gray-400 text-gray-600">{user.id}</h3>
                    </div>
                </section>
            </section>
            <article className="w-full grid lg:grid-cols-3 gap-2">
                <Card
                    title="Objects"
                    icon={FaFileAlt}
                    value={status?.objects || "Unavailable"}
                    description="This represents the object count on your blob"
                    tooltip="Note that this information may be a little out of date due to caching"
                />
                <Card
                    title="Size"
                    icon={IoServerSharp}
                    value={
                        status?.size ?
                            prettyBytes(status.size)
                            :
                            "Unavailable"
                    }
                    description="That's all the space taken up by your files"
                    tooltip="Note that this information may be a little out of date due to caching"
                />
                <Card
                    title="Estimated Cost"
                    icon={MdAttachMoney}
                    value={
                        typeof status?.totalEstimate === 'number' && !isNaN(status.totalEstimate) ?
                            Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(status.totalEstimate)
                            :
                            "Unavailable"
                    }
                    description="This is the amount to be paid upon renewal"
                />
            </article>
        </article >
    )

}