'use client';
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import React, { FormEvent, useState } from "react";
import Cookies from 'js-cookie';
import { useFileContext } from "./provider";
import { CiWarning } from "react-icons/ci";
import prettyBytes from "pretty-bytes";

const messages = {
    "INVALID_OBJECTS": 'You selected some invalid objects, maybe you deleted from another local.',
    "TOO_MANY_OBJECTS": 'You have exceeded the limit of objects to delete.'
}

export default function DeleteFiles() {

    const [result, setResult] = useState<React.ReactNode>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const { rowSelection, files: filesContext, setFiles, setRowSelection } = useFileContext();
    const indexes = Object.keys(rowSelection);
    const files = indexes.map(index => filesContext?.[+index]);
    const HandleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        setFetching(true);

        try {

            const response = await fetch("https://blob.squarecloud.app/v1/delete", {
                method: 'DELETE',
                headers: { Authorization: Cookies.get("apikey")! },
                body: JSON.stringify({ objects: files.map(file => file?.name) })
            });

            const data = await response.json();

            if (data.code && response.status !== 200) {
                setResult(messages[data.code as keyof typeof messages] || "An unknown error ocurred.")
            } else if (response.status === 200) {

                setResult("Objects deleted succesfully!");
                setFiles(current => {

                    if (!current) return null;

                    return current.filter((item, i) => !rowSelection[i]);

                });

                setRowSelection({});

            }

        } catch (e: any) {
            setResult("An unknown error ocurred: " + e.message)
        }

        setTimeout(() => { setResult(null) }, 1000 * 5);

        setFetching(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={'destructive'}
                    disabled={!indexes.length}
                >Delete files</Button>
            </DialogTrigger>
            <DialogContent className="dark:bg-black border-2">
                <DialogHeader>
                    <DialogTitle>Delete files</DialogTitle>
                    <DialogDescription>
                        {result || (
                            <form onSubmit={HandleSubmit} className="pt-4 flex flex-col gap-4 text-start">
                                <h1 className="font-medium text-lg dark:text-gray-300 text-gray-700">
                                    Take care! These {indexes.length} objects will be deleted -&nbsp;
                                    <span className="text-yellow-400 font-medium text-sm">
                                        {prettyBytes(files.reduce((a, file) => a + (file!.size || 0), 0))}
                                    </span>:
                                </h1>
                                <ul className="list-decimal pl-8">
                                    {files.map((file, i) => (
                                        <li key={i}>
                                            <span className="text-yellow-400">{prettyBytes(file?.size || 0)}</span>
                                            &nbsp;-&nbsp;
                                            <span>{file!.name?.split("/").slice(1)}</span>
                                        </li>
                                    ))}
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

