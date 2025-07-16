import { Table } from "@tanstack/react-table";
import SetPage from "./set_page";
import { File } from "../provider";
import Search from "./search";
import { User } from "@/interfaces/user";
import { Object } from "@/interfaces/list";
import UploadFile from "./actions/upload/main";

export default function CustomHeader({ user, objects }: { user: User, objects: Object[] }, { table }: { table: Table<File> }) {

    return (
        <nav className="w-full flex flex-col sm:flex-row items-center gap-2 pt-4 border-t-2 sm:border-none sm:pt-0">
            <Search table={table} />
            <div className="w-full sm:w-fit flex gap-2">
                <UploadFile />
                <SetPage table={table} />
            </div>
        </nav>
    )
}