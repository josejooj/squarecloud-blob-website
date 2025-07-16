'use client';
import { cn } from "@/lib/utils";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Checkbox } from "../../../ui/checkbox";
import { Button } from "../../../ui/button";
import React, { FormEvent, useState } from "react";
import Cookies from 'js-cookie';
import { CiCircleCheck, CiWarning } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { useFileContext } from "../../provider";

const messages = {
    'INVALID_FILETYPE': 'Sorry, this file type isn\'t supported yet.',
    'INVALID_FILE': 'The provided file is invalid or corrupted.',
    'FILE_TOO_SMALL': 'The file size must be at least 1kB.',
    'FILE_TOO_LARGE': 'The file size must be at max 100MB.',
    'ACCESS_DENIED': 'Please, check you API Key.'
}

const messages_by_status = {
    200: "Object inserted successfully!",                    // 200 OK
    413: "The file size must be at max 100MB.",              // 413 Payload Too Large
    524: "Sorry, apparently the api is offline, try again.", // 524 A Timeout Ocurred
    503: "Sorry, apparently the api is offline, try again.", // 503 Service Unavailable
    504: "Sorry, apparently the api is offline, try again.", // 504 Gateway Timeout
    505: "Please, update your navigator",                    // 505 HTTP Version Not Supported
    523: "Maybe your country is blocked."                    // Origin is unreachable
}

const parseJsonBody = async<T extends any = any>(input: any): Promise<T> => {

    try {
        return JSON.parse(input) || {};
    } catch (e) {
        return {} as T
    }

}

export default function AddFile() {

    const [result, setResult] = useState<React.ReactNode>(null);
    const [fetching, setFetching] = useState<boolean>(false);
    const { setFiles } = useFileContext();
    const handleSubmit = async (event: FormEvent) => {

        event.preventDefault();

        setFetching(true);

        const originalform = new FormData(event.target as HTMLFormElement);
        const requestform = new FormData();
        const url = new URL("https://blob.squarecloud.app/v1/objects");
        const file = originalform.get("file") as File;

        requestform.append("file", file!);

        for (let [key, value] of originalform.entries()) {

            if (key === 'file' || !value) continue;
            if (key === 'secure') value = (value === 'on') as any;

            url.searchParams.append(key, value.toString());

        }

        const xhr = new XMLHttpRequest();

        xhr.open("POST", url.toString());
        xhr.setRequestHeader('Authorization', Cookies.get('apikey')!);
        xhr.send(requestform);
        xhr.onload = async () => {

            const data = await parseJsonBody(xhr.response);
            const Icon = xhr.status === 200 ? FaCheck : CiWarning;

            setResult((
                <div className="flex items-center gap-4 pt-4 text-muted-foreground">
                    <Icon size={24} />
                    <h1>{
                        messages[data.code as keyof typeof messages] ||
                        messages_by_status[xhr.status as keyof typeof messages_by_status] ||
                        "An unknown error ocurred."
                    }</h1>
                </div>
            ))

            setFetching(false);
            setTimeout(() => { setResult(null) }, 1000 * 5)

            if (xhr.status === 200) {

                setFiles(current => {

                    if (!current) return null;

                    return [{
                        id: data?.response?.id || "Unknown.",
                        created_at: new Date(),
                        size: file.size
                    }].concat(current);

                });

            }

        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add item to blob</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send file to blob</DialogTitle>
                    <DialogDescription>
                        {result || (
                            <form onSubmit={handleSubmit} method="POST" className="pt-4 flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="filename">File name *</Label>
                                    <Input id='filename' name="name" placeholder="Insert the file name" maxLength={30} required className="border-2" pattern="\w{1,}" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="prefix">Prefix</Label>
                                    <Input id='prefix' name="prefix" placeholder="Prefix (Optional)" maxLength={30} className="border-2" pattern="\w{1,}" />
                                </div>
                                <div className="flex flex-col sm:grid grid-cols-4 gap-2 sm:items-center">
                                    <input
                                        className={"p-2 bg-secondary col-span-3 block w-full font-medium border rounded-md cursor-pointer"}
                                        name="file"
                                        type="file"
                                        required
                                    />
                                    <div className="flex items-center gap-2 sm:place-self-center">
                                        <Checkbox defaultChecked name="secure" /> Security Hash
                                    </div>
                                </div>
                                <Button type="submit" variant={"outline"} className="border-2" disabled={fetching}>Send File</Button>
                            </form>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

