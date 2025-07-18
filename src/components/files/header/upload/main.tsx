'use client';
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Check, Loader, Plus, X } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../ui/dialog";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { UploadFileAction } from "./action";

export default function UploadFile() {

    const [state, action] = useActionState(UploadFileAction, getInitialState());

    return (
        <Dialog defaultOpen={!!state}>
            <DialogTrigger asChild>
                <Button size={"icon"}><Plus /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload file to blob</DialogTitle>
                    <form action={action} className="pt-4 flex flex-col gap-4">
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
            <span>Upload File</span>
        </Button>
    )

}

function getInitialState() {
    // Check if we're on the client side
    if (typeof document !== 'undefined') {
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

    // Server side - use Next.js cookies
    const { cookies } = require('next/headers');
    const cookieStore = cookies();
    const state = cookieStore.get('result:file.upload');

    if (!state) return null;

    return JSON.parse(state.value);
}