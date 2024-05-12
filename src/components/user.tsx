import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import { IoServerSharp } from "react-icons/io5";
import { FaFileAlt } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import prettyBytes from "pretty-bytes";
import { Skeleton } from "./ui/skeleton";

interface CardProps {
    title: string,
    icon: IconType,
    value: string,
    description: string
}

function Card({ title, icon: Icon, description, value }: CardProps) {
    return (
        <section className="p-2 rounded-md border-2 ">
            <div className="flex items-center justify-between pb-2">
                <nav className="flex items-center gap-2">
                    <Icon size={18} />
                    <h1 className="font-medium text-lg">{title}</h1>
                </nav>
                <h3 className="text-sm">{value}</h3>
            </div>
            <h5 className="text-sm text-gray-400">{description}</h5>
        </section>
    )
}

export function UserSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            <Skeleton className="w-32 h-8" />
            <Skeleton className="w-64 h-4 pt-2" />
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

    return (
        <article className="flex flex-col gap-4">
            <section className="flex flex-col gap-2">
                <h1 className="font-bold text-3xl">{user.tag}</h1>
                <h3 className="text-sm font-light">{user.id}</h3>
            </section>
            <article className="w-full grid lg:grid-cols-3 gap-2">
                <Card
                    title="Objects"
                    icon={FaFileAlt}
                    value={status?.objects || "Unavailable"}
                    description="This represents the object count on your blob"
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
                />
                <Card
                    title="Estimated Cost"
                    icon={MdAttachMoney}
                    value={
                        status?.totalEstimate ?
                            Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(status.size)
                            :
                            "Unavailable"
                    }
                    description="This is the amount to be paid upon renewal"
                />
            </article>
        </article>
    )

}