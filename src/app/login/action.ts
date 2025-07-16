'use server';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export default async function LoginAction(prevState: any, form: FormData) {

    const apikey = form.get('apikey')?.toString();

    if (!apikey || !/^([\d]{18,21}|[a-z0-9]{40})-[a-z0-9]{64}$/.test(apikey)) {
        return "Authentication Failed, review your API Key"; // Method not allowed
    }

    const response = await fetch('https://api.squarecloud.app/v2/users/me', {
        headers: { Authorization: apikey }
    })

    if (response.ok) {

        const store = await cookies()

        store.set({
            name: "apikey",
            value: apikey,
            secure: true,
            httpOnly: true,
            sameSite: "strict",
        })

        redirect("/");

    }

    if (response.status === 401) return "Authentication Failed, review your API Key"
    if (response.status === 429) return "Rate-Limited. Please, wait a few minutes."
    if (response.status === 403) return "Access Denied to Square Cloud"
    if (response.status === 524) return "A Timeout ocurred. Please, try again."
    if (response.status > 500) { // 502 (Bad Gateway), 503 (Service Unavailable), etc...
        return "Square Cloud API is offline. Try again later.";
    }

    return "An internal server error ocurred. Please, try again later."

}