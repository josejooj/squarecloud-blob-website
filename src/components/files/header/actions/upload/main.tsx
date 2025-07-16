'use client';
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle } from "../../../../ui/dialog";
import { Input } from "../../../../ui/input";
import { Label } from "../../../../ui/label";
import { Checkbox } from "../../../../ui/checkbox";
import { Button } from "../../../../ui/button";
import React, { useActionState } from "react";
import { UploadFileAction } from "./action";
import { useFormStatus } from "react-dom";
import { Check, Loader, Plus, X } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function UploadFile() {

    const [state, action] = useActionState(UploadFileAction, getInitialState());

    return (
        <Dialog defaultOpen={!!state}>
            <DialogTrigger asChild>
                <Button size={"icon"}><Plus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send file to blob</DialogTitle>
                    <form action={action} method="POST" className="pt-4 flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="filename">File name *</Label>
                            <Input
                                id='filename'
                                name="name"
                                placeholder="Insert the file name"
                                maxLength={30}
                                required
                                className="border-2"
                                pattern="\w{1,}"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="prefix">Prefix</Label>
                            <Input
                                id='prefix'
                                name="prefix"
                                placeholder="Prefix (Optional)"
                                maxLength={30}
                                className="border-2"
                                pattern="\w{1,}"
                            />
                        </div>
                        <div className="grid sm:flex items-center gap-2 text-sm">
                            <input
                                className={"p-2 block w-full font-medium border rounded-md cursor-pointer"}
                                name="file"
                                type="file"
                                required
                            />
                            <div className="flex items-center gap-2 whitespace-nowrap">
                                <Checkbox defaultChecked name="secure" id="secure" />
                                <label htmlFor="secure" className="select-none">Security Hash</label>
                            </div>
                        </div>
                        <SubmitButton />
                        {!!state && (
                            <Alert variant={state?.success ? "default" : "destructive"}>
                                {state.success ? <Check /> : <X />}
                                <AlertTitle>{state?.message}</AlertTitle>
                            </Alert>
                        )}
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function SubmitButton() {

    const { pending } = useFormStatus();
    const emoji = pending
        ? (<Loader className="animate-spin" />)
        : (<Plus />)

    return (
        <Button type="submit" disabled={pending}>
            {emoji}
            <span>Send File</span>
        </Button>
    )

}

function getInitialState() {

    const name = "result:file.upload=";
    const state = document.cookie
        .split("; ")
        .filter(x => x.startsWith(name))?.[0];

    if (!state) return null;

    return JSON.parse(
        decodeURIComponent(
            state.slice(name.length)
        )
    );

}