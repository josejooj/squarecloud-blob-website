'use client';
import { ColumnDef } from "@tanstack/react-table";
import { DataTable, SortedHeader } from "../data-table";
import { Label } from "../ui/label";
import { File, useFileContext } from "./provider";
import prettyBytes from "pretty-bytes";
import { Button } from "../ui/button";
import ResponsivePopover from "../ResponsivePopover";

export default function ListFiles() {

    const { files } = useFileContext();
    const columns: ColumnDef<File>[] = [
        {
            accessorKey: "name",
            header: SortedHeader({ title: "File name" }),
            cell: ({ getValue }) => {

                const value = getValue<string>();

                return value.split("/").slice(1).join("/")

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
                    <span className="font-medium">{DateFormatter.format(value)}</span>
                )

            }
        },
        {
            header: SortedHeader({ title: "File size" }),
            accessorKey: "size",
            cell: ({ getValue }) => {

                const value = getValue<number>();
                const minFileSize = 1000; // 1KB
                const maxFileSize = 100000000; // 100MB

                const minColor = [0, 255, 0]; // Green in RGB
                const maxColor = [255, 0, 0]; // Red in RG
                const normalizedValue = (value - minFileSize) / (maxFileSize - minFileSize);

                const interpolatedColor = minColor.map((min, i) => {
                    const max = maxColor[i];
                    const component = Math.round(min + (max - min) * normalizedValue);
                    return component.toString(16).padStart(2, '0');
                });

                const color = `#${interpolatedColor.join('')}`;

                return (
                    <span className="font-medium" style={{ color }}>{prettyBytes(value)}</span>
                )

            }
        },
        {
            header: " ",
            cell: ({ row }) => {
                return (
                    <ResponsivePopover trigger={(
                        <Button variant={'secondary'} className="mx-auto px-auto">Manage</Button>
                    )}>
                        <h1 className="text-center font-medium py-4">Manage Object</h1>
                        <div className="flex flex-col gap-2">
                            <Button className="w-full" variant="outline" onClick={() => open(`https://public-blob.squarecloud.dev/${row.original.name}`)}>Access file</Button>
                            <Button className="w-full" variant="destructive">Delete file</Button>
                        </div>
                    </ResponsivePopover>
                )
            }
        }
    ]

    if (files === null) return (
        <DataTable columns={columns} data={[]} no_data_text="Loading your files..." />
    )

    return (
        <DataTable columns={columns} data={files} no_data_text="Looks like you don't have objects stored." />
    )
}