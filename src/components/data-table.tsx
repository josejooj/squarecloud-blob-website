import { ColumnDef, OnChangeFn, RowSelectionState, SortingState, Table as TableT, TableOptions, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import React, { useState } from "react";
import { FaArrowDownUpAcrossLine, FaArrowDownZA, FaArrowUpZA } from "react-icons/fa6";

type CustomHeader = ({ table }: { table: TableT<any> }) => React.JSX.Element

interface Props<T> {
    columns: ColumnDef<T>[],
    data: T[],
    no_data_text?: string | React.ReactNode,
    rowSelection?: RowSelectionState,
    onRowSelection?: OnChangeFn<RowSelectionState>,
    CustomHeader?: CustomHeader
}

export function DataTable<T>({ columns, data, no_data_text, rowSelection, onRowSelection, CustomHeader }: Props<T>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const options: TableOptions<T> = {
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: { sorting }
    }

    if (rowSelection) options.state!.rowSelection = rowSelection;
    if (onRowSelection) options.onRowSelectionChange = onRowSelection;

    const table = useReactTable(options)
    const Header: CustomHeader = CustomHeader || (() => <></>)

    return (
        <div className="flex flex-col gap-2">
            <Header table={table} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="dark:bg-gray-950 bg-slate-100">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {no_data_text || "No results."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )

}

export function SortedHeader({ title }: { title: string }): ColumnDef<any>['header'] {

    return function header({ column }) {

        const Icon = (() => {

            const sorted = column.getIsSorted();

            if (sorted === 'asc') return FaArrowUpZA;
            if (sorted === 'desc') return FaArrowDownZA;

            return FaArrowDownUpAcrossLine;

        })();

        return (
            <div
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="flex items-center gap-2 group cursor-pointer whitespace-nowrap"
            >
                <span>{title}</span>
                <Icon size={24} className="p-1 rounded-full group-hover:dark:bg-slate-600 group-hover:bg-slate-200 duration-200" />
            </div>
        )

    }

}