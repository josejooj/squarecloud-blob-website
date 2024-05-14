'use client';
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import React, { FormEvent, useState } from "react";
import Cookies from 'js-cookie';
import { useFileContext } from "./provider";
import { CiWarning } from "react-icons/ci";

export default function DeleteFiles() {

    const [result, setResult] = useState<React.ReactNode>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const { rowSelection, files } = useFileContext();
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
                                <h1 className="font-medium text-lg dark:text-gray-300 text-gray-700">Take care! These objects will be deleted:</h1>
                                <ul className="sm:list-decimal sm:pl-4">
                                    {Object.keys(rowSelection).map((index) => (<li>{files?.[+index].name?.split("/").slice(1)}</li>))}
                                </ul>
                                <div className="flex gap-2 dark:text-gray-300 text-gray-700">
                                    <CiWarning size={22} className="dark:text-red-500 text-red-500" />
                                    <span className="font-medium">Please note that the exclusion is definitive and permanent!</span>
                                </div>
                                <nav className="w-full flex-col-reverse flex sm:flex-row items-center gap-2">
                                    <DialogClose asChild><Button variant={'outline'} className="w-full">Cancel</Button></DialogClose>
                                    <Button type="submit" variant={"destructive"} disabled={fetching} className="w-full">Delete files</Button>
                                </nav>
                            </form>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

