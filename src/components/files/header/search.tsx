import { Table } from "@tanstack/react-table";
import { File } from "../provider";
import { Input } from "../../ui/input";

export default function Search({ table }: { table: Table<File> }) {

    return (
        <Input
            placeholder="Search by file name"
            className="w-full"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
        />
    )
}