'use server';

import { Object } from "@/interfaces/list";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const messages = {
    "INVALID_OBJECTS": 'You selected some invalid objects, maybe you deleted from another local.',
    "TOO_MANY_OBJECTS": 'You have exceeded the limit of objects to delete.'
}

export async function DeleteFilesAction(object: Object, prevState: any, form: FormData) {

    const cookieStore = await cookies();
    const apikey = cookieStore.get('apikey')?.value;

    if (!apikey || !/^([\d]{18,21}|[a-z0-9]{40})-[a-z0-9]{64}$/.test(apikey)) {
        cookieStore.delete('apikey');
        redirect("/login");
    }

    const response = await fetch("https://blob.squarecloud.app/v1/objects", {
        method: 'DELETE',
        headers: { Authorization: apikey },
        body: JSON.stringify({ object: object.id })
    });

    const data = await response.json();

    if (response.status === 401) {
        cookieStore.delete('apikey');
        redirect("/login");
    }

    if (response.ok) {
        revalidateTag(`objects.${apikey.split('-')[0]}`);
    }

    return {
        success: response.ok,
        message: messages[data.code as keyof typeof messages] || "An unknown error occurred."
    }

}