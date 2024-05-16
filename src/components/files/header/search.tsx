import { Table } from "@tanstack/react-table";
import { File } from "../provider";
import { Input } from "../../ui/input";
import { IoMdSearch } from "react-icons/io";

export default function Search({ table }: { table: Table<File> }) {

    return (
        <div className="flex items-center gap-2 w-full border rounded-md px-2 dark:text-gray-300">
            <IoMdSearch size={24} className=""/>
            <input
                placeholder="Search by file name"
                className="w-full py-2 text-sm bg-transparent focus:outline-none"
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
            />
        </div>
    )
}