'use client';
import { cn } from "@/lib/utils";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import React, { FormEvent, useState } from "react";
import Cookies from 'js-cookie';
import { CiCircleCheck, CiWarning } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";

const messages = {
    'INVALID_FILETYPE': 'Sorry, this file type isn\'t supported yet.',
    'INVALID_FILE': 'The provided file is invalid or corrupted.',
    'FILE_TOO_SMALL': 'The file size must be at least 1kB.',
    'FILE_TOO_LARGE': 'The file size must be at max 100MB.',
    'ACCESS_DENIED': 'Please, check you API Key.'
}

const messages_by_status = {
    200: "Object inserted successfully!",
    413: "The file size must be at max 100MB."
}

export default function AddFile() {

    const [result, setResult] = useState<React.ReactNode>(null)
    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        const originalform = new FormData(event.target as HTMLFormElement);
        const requestform = new FormData();
        const url = new URL("https://blob.squarecloud.app/v1/put");

        requestform.append("file", originalform.get("file")!);

        for (let [key, value] of originalform.entries()) {

            if (key === 'file' || !value) continue;
            if (key === 'secure') value = (value === 'on') as any;

            url.searchParams.append(key, value.toString());

        }

        const response = await fetch(url.toString(), {
            method: 'PUT',
            headers: { Authorization: Cookies.get("apikey")! },
            body: requestform
        }).catch(e => e);

        const data = await response.json?.().catch(() => ({})) || {};
        const Icon = response.status === 200 ? FaCheck : CiWarning;

        console.log(response, messages[data.code as keyof typeof messages], data.code, data)

        setResult((
            <div className="flex items-center gap-4 pt-4 text-gray-200">
                <Icon size={24} />
                <h1>{
                    messages[data.code as keyof typeof messages] ||
                    messages_by_status[response.status as keyof typeof messages_by_status] ||
                    "An unknown error ocurred."
                }</h1>
            </div>
        ))

        setTimeout(() => {
            setResult(null)
        }, 1000 * 5)

    }

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className={cn(
                        "bg-green-300 dark:bg-green-500 hover:bg-green-200 dark:hover:bg-green-400",
                        "p-2 rounded-md text-black duration-200"
                    )}
                >Add item to blob</div>
            </DialogTrigger>
            <DialogContent className="dark:bg-black border-2">
                <DialogHeader>
                    <DialogTitle>Send file to blob</DialogTitle>
                    <DialogDescription>
                        {result || (
                            <form onSubmit={handleSubmit} method="POST" className="pt-4 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="filename" className="dark:text-gray-300">File name *</Label>
                                    <Input id='filename' name="name" placeholder="Insert the file name" maxLength={30} required className="border-2" pattern="\w{1,}" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="prefix" className="dark:text-gray-300">Prefix</Label>
                                    <Input id='prefix' name="prefix" placeholder="Prefix (Optional)" maxLength={30} className="border-2" pattern="\w{1,}" />
                                </div>
                                <div className="flex flex-col sm:grid grid-cols-4 gap-2 sm:items-center">
                                    <input
                                        className={cn(
                                            "text-gray-900 dark:text-gray-400 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700",
                                            "col-span-3 block w-full font-medium border rounded-md cursor-pointer focus:outline-none dark:placeholder-gray-400"
                                        )}
                                        name="file"
                                        type="file"
                                        required
                                    />
                                    <div className="flex items-center gap-2 sm:place-self-center">
                                        <Checkbox className="dark:border-slate-800" defaultChecked name="secure" /> Security Hash
                                    </div>
                                </div>
                                <Button type="submit" variant={"outline"} className="border-2" >Send File</Button>
                            </form>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

