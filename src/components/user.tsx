import React from "react";
import { IconType } from "react-icons";
import { IoServerSharp } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Image from "next/image";
import { FaAddressCard } from "react-icons/fa";
import { formatBytes } from "@/lib/bytes";
import { ObjectStats } from "@/interfaces/stats";
import { User } from "@/interfaces/user";

interface CardProps {
    title: string,
    icon: IconType,
    value: string,
    description: string
    tooltip?: string
}

function Card({ title, icon: Icon, description, value, tooltip }: CardProps) {
    return (
        <section className="p-2 rounded-md border-2 bg-card transition-colors duration-500">
            <div className="flex items-center justify-between pb-2">
                <nav className="flex items-center gap-2">
                    <Icon size={18} />
                    <h1 className="text-lg font-semibold">{title}</h1>
                </nav>
                <h3 className="text-sm font-medium font-mono">{value}</h3>
            </div>
            <div className="w-full flex justify-between">
                <h5 className="text-sm text-card-foreground font-medium">{description}</h5>
                {tooltip && (
                    <TooltipProvider>
                        <Tooltip delayDuration={200}>
                            <TooltipTrigger><IoMdInformationCircleOutline size={24} /></TooltipTrigger>
                            <TooltipContent>{tooltip}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
        </section>
    )
}

export async function UserDetails({ user, stats }: { user: User, stats: ObjectStats }) {
    return (
        <article className="flex flex-col gap-4">
            <section className="flex items-center gap-4">
                <Image
                    src={user.avatar}
                    width={64}
                    height={64}
                    alt="Profile picture"
                    className="rounded-md"
                />
                <section className="flex flex-col gap-2">
                    <h1 className="font-bold text-3xl">{user.name}</h1>
                    <div className="flex items-center gap-2">
                        <FaAddressCard />
                        <h3 className="text-xs font-medium">{user.id}</h3>
                    </div>
                </section>
            </section>
            <article className="w-full grid lg:grid-cols-3 gap-2">
                <Card
                    title="Objects"
                    icon={FaFileAlt}
                    value={stats.usage.objects?.toString()}
                    description="This represents the object count on your blob"
                    tooltip="Note that this information may be a little out of date due to caching"
                />
                <Card
                    title="Size"
                    icon={IoServerSharp}
                    value={formatBytes(stats.usage.storage)}
                    description="That's all the space taken up by your files"
                    tooltip="Note that this information may be a little out of date due to caching"
                />
                <Card
                    title="Estimated Cost"
                    icon={MdAttachMoney}
                    value={Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(stats.billing.totalEstimate)}
                    description="This is the amount to be paid upon renewal"
                />
            </article>
        </article >
    )

}