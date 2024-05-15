import { Table } from "@tanstack/react-table";
import AddFile from "./add";
import DeleteFiles from "./delete";

export default function CustomHeader({ table }: { table: Table<File> }) {

    return (
        <nav className="flex items-center gap-2">
            <AddFile />
            <DeleteFiles />
        </nav>
    )
}