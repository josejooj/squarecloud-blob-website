import { Table } from "@tanstack/react-table";
import AddFile from "./add";
import DeleteFiles from "./delete";
import SetPage from "./set_page";
import { File } from "./provider";

export default function CustomHeader({ table }: { table: Table<File> }) {

    return (
        <nav className="flex items-center gap-2">
            <AddFile />
            <DeleteFiles />
            <SetPage table={table} />
        </nav>
    )
}