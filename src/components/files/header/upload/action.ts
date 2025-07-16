'use server';

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

type Result = {
    success: boolean,
    message: string
}

type Response = {
    status: "success" | "error",
    code: string,
}

export async function UploadFileAction(prevState: unknown, form: FormData): Promise<Result> {

    const cookieStore = await cookies();
    const apikey = cookieStore.get('apikey')?.value;

    if (!apikey || !/^([\d]{18,21}|[a-z0-9]{40})-[a-z0-9]{64}$/.test(apikey)) {
        cookieStore.delete('apikey');
        redirect("/login");
    }

    const requestform = new FormData();
    const url = new URL("https://blob.squarecloud.app/v1/objects");
    const file = form.get("file") as File;

    requestform.append("file", file!);

    for (let [key, value] of form.entries()) {

        if (key === 'file' || !value) continue;
        if (key === 'secure') value = (value === 'on') as any;

        url.searchParams.append(key, value.toString().trim());

    }

    const request = await fetch(url.toString(), {
        method: "POST",
        body: requestform,
        headers: { 'Authorization': apikey }
    });

    const data = await request.json().catch(() => ({ success: false })) as Response;
    const response = {
        success: request.ok,
        message: messages[data.code as keyof typeof messages] || messages_by_status[request.status as keyof typeof messages_by_status] || "An unknown error occurred."
    }

    if (request.status === 401) {
        cookieStore.delete('apikey');
        redirect("/login");
    }

    if (request.ok) {
        cookieStore.set('result:file.upload', JSON.stringify(response), { path: '/', maxAge: 15 });
        revalidateTag(`objects.${apikey.split('-')[0]}`);
    }

    return response;

}