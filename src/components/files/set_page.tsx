import { Table } from "@tanstack/react-table";
import { File } from "./provider";
import { Button } from "../ui/button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export default function SetPage({ table }: { table: Table<File> }) {


    return (
        <div className="flex gap-2">
            <Button
                variant={'ghost'}
                className="px-2 border-2"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <MdKeyboardArrowLeft size={24} />
            </Button>
            <Button
                variant={'ghost'}
                className="px-2 border-2"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <MdKeyboardArrowRight size={24} />
            </Button>
        </div>
    )
}