'use client';
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import React, { FormEvent, useState } from "react";
import Cookies from 'js-cookie';
import { useFileContext } from "./provider";

export default function DeleteFiles() {

    const [result, setResult] = useState<React.ReactNode>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const { rowSelection } = useFileContext();
    const HandleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        // TODO Create request logic.

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'destructive'}
                    disabled={!Object.keys(rowSelection).length}
                >Delete files</Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-black border-2">
                <DialogHeader>
                    <DialogTitle>Delete files</DialogTitle>
                    <DialogDescription>
                        {result || (
                            <form onSubmit={HandleSubmit} className="pt-4 flex flex-col gap-4">

                                <nav className="w-full flex items-center gap-2">
                                    <DialogClose asChild><Button variant={'outline'} className="w-full">Cancel</Button></DialogClose>
                                    <Button type="submit" variant={"destructive"} disabled={fetching} className="w-full">Send File</Button>
                                </nav>
                            </form>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

