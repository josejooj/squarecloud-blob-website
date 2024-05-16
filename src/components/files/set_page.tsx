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
            <div className="text-sm">
                <input
                    className="h-full bg-transparent focus:outline-none cursor-default"
                    style={{ width: `${(table.getState().pagination.pageIndex + 1).toString().length + 1}ch` }}
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={e => {

                        const page = +e.target.value.split("").filter(char => +char || char === "0").join("")

                        if (!page || page >= table.getPageCount() + 1 || page <= 0) return;

                        table.setPageIndex(page - 1);

                    }}
                />
                / {table.getPageCount()}
            </div>
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