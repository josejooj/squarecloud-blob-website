import { Table } from "@tanstack/react-table";
import { File } from "../provider";
import { Button } from "../../ui/button";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

export default function SetPage({ table }: { table: Table<File> }) {

    const [mounted, setMounted] = useState(false);
    const setPageOnHookUpdate = useRef<number>(0);
    const leftBtn = useRef<HTMLButtonElement>(null);
    const rightBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => { setMounted(true); }, [])
    useEffect(() => {

        if (!mounted) return;

        document.addEventListener('keydown', e => {
            if (e.key === "ArrowLeft") return leftBtn.current?.click();
            if (e.key === "ArrowRight") return rightBtn.current?.click();
        })

    }, [mounted])

    return (
        <div className="flex flex-nowrap gap-2">
            <Button
                ref={leftBtn}
                variant={'ghost'}
                className="px-2 border-2"
                onClick={() => {
                    table.previousPage()
                    setPageOnHookUpdate.current = 0;
                }}
                disabled={!table.getCanPreviousPage()}
            >
                <MdKeyboardArrowLeft size={24} />
            </Button>
            <div className="text-sm flex items-center flex-nowrap">
                <input
                    className="bg-transparent focus:outline-none cursor-default"
                    style={{ width: `${(table.getState().pagination.pageIndex + 1).toString().length + 1}ch` }}
                    value={table.getState().pagination.pageIndex + 1}
                    onChange={async e => {

                        const page = +e.target.value.split("").filter(char => +char || char === "0").join("")

                        if (!page || page >= table.getPageCount() + 1 || page <= 0) return;

                        table.setPageIndex(page - 1);

                        if (page === table.getPageCount()) {
                            setPageOnHookUpdate.current = page - 1;
                        } else {
                            setPageOnHookUpdate.current = 0;
                        }

                    }}
                />
                <span className="pr-2">of</span>
                <span>{table.getPageCount()}</span>
            </div>
            <Button
                ref={rightBtn}
                variant={'ghost'}
                className="px-2 border-2"
                onClick={async () => {

                    table.nextPage()

                    const nextPageIndex = table.getState().pagination.pageIndex + 1

                    if (nextPageIndex === table.getPageCount() - 1) {
                        setPageOnHookUpdate.current = nextPageIndex;
                    } else {
                        setPageOnHookUpdate.current = 0;
                    }

                }}
                disabled={!table.getCanNextPage()}
            >
                <MdKeyboardArrowRight size={24} />
            </Button>
        </div>
    )
}