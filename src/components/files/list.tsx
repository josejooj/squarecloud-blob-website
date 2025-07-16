'use client';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, SortedHeader } from "../data-table";
import { useFileContext } from "./provider";
import { Button } from "../ui/button";
import { FaLink } from "react-icons/fa6";
import CustomHeader from "./header/main";
import { formatBytes } from "@/lib/bytes";
import { Object } from "@/interfaces/list";
import { User } from "@/interfaces/user";
import DeleteFile from "./delete/main";

export default function ListFiles({ objects, user }: { objects: Object[], user: User }) {

    const { rowSelection, setRowSelection, columnFilters, setColumnFilters } = useFileContext();
    const columns: ColumnDef<Object>[] = [
        {
            accessorKey: "id",
            header: SortedHeader({ title: "ID" }),
            cell: ({ getValue }) => {
                return <span className="font-mono">{getValue<string>()}</span>;
            }
        },
        {
            header: SortedHeader({ title: "Created At" }),
            accessorKey: "created_at",
            cell: ({ getValue }) => {

                const value = getValue<Date>();
                const DateFormatter = Intl.DateTimeFormat(navigator.language, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    minute: "2-digit",
                    hour: "2-digit"
                });

                return (
                    <span className="font-semibold font-mono" suppressHydrationWarning>
                        {DateFormatter.format(new Date(value))}
                    </span>
                )

            }
        },
        {
            header: SortedHeader({ title: "File size" }),
            accessorKey: "size",
            cell: ({ getValue }) => {

                const value = getValue<number>();
                const colors = [
                    "text-green-600 dark:text-green-200",    // 0-10 MB (mais claro)
                    "text-green-700 dark:text-green-400",    // 10-20 MB
                    "text-lime-700 dark:text-lime-400",      // 20-30 MB
                    "text-yellow-700 dark:text-yellow-400",  // 30-40 MB
                    "text-amber-700 dark:text-amber-400",    // 40-50 MB
                    "text-orange-700 dark:text-orange-400",  // 50-60 MB
                    "text-orange-800 dark:text-orange-600",  // 60-70 MB
                    "text-red-600 dark:text-red-400",        // 70-80 MB
                    "text-red-800 dark:text-red-600",        // 80-90 MB
                    "text-red-900 dark:text-red-800",        // 90-100 MB (mais forte)
                ];

                const color = colors[Math.floor((value / (1024 * 1024)) / 10)];

                return (
                    <span className={`font-mono ${color}`}>{formatBytes(value)}</span>
                )

            }
        },
        {
            header: " ",
            cell: ({ row }) => {
                return (
                    <Button className="w-full flex items-center gap-2" variant="link" onClick={() => open(`https://public-blob.squarecloud.dev/${row.original.id}`)}>
                        <span>Access file</span>
                        <FaLink />
                    </Button>
                )
            }
        },
        {
            id: "delete",
            cell: ({ row }) => (
                <DeleteFile object={row.original} />
            )
        }
    ]

    return (
        <DataTable
            columns={columns}
            data={objects}
            no_data_text="Looks like you don't have objects stored."
            rowSelection={rowSelection}
            onRowSelection={setRowSelection}
            CustomHeader={CustomHeader.bind(null, { user, objects })}
            pagination={true}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
        />
    )
}