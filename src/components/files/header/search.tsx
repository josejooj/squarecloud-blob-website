import { Table } from "@tanstack/react-table";
import { File } from "../provider";
import { IoMdSearch } from "react-icons/io";

export default function Search({ table }: { table: Table<File> }) {

    return (
        <div className="flex items-center gap-2 w-full border rounded-md px-2">
            <IoMdSearch size={24} className=""/>
            <input
                autoFocus
                placeholder="Search by ID"
                className="w-full py-2 text-sm bg-transparent focus:outline-none"
                value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("id")?.setFilterValue(event.target.value)
                }
            />
        </div>
    )
}