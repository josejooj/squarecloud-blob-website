'use client';
import { type Object } from "@/interfaces/list";
import React, { useActionState } from "react";
import { Button } from "../../ui/button";
import { useFormStatus } from "react-dom";
import { DeleteFilesAction } from "./action";
import { Loader, Trash } from "lucide-react";

export default function DeleteFile({ object }: { object: Object }) {

    const [state, action] = useActionState(DeleteFilesAction.bind(null, object), null)

    return (
        <form action={action}>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <Button
            size="icon"
            type="submit"
            variant={"ghost"}
            disabled={pending}
        >
            {pending ? <Loader className="animate-spin" /> : <Trash />}
        </Button>
    );
}
