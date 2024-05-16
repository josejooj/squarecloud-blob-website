import { Table } from "@tanstack/react-table";
import AddFile from "./actions/add";
import DeleteFiles from "./actions/delete";
import SetPage from "./set_page";
import { File } from "../provider";
import Search from "./search";
import Actions from "./actions/main";

export default function CustomHeader({ table }: { table: Table<File> }) {

    return (
        <nav className="flex items-center gap-2">
            <Search table={table} />
            <Actions />
            <SetPage table={table} />
        </nav>
    )
}