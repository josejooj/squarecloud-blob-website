'use client';
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function login() {

    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const apikey = formData.get('apikey')!
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apikey.toString()
            }
        });

        if (response.ok) {
            router.push('/profile')
        } else {
            // Handle errors
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" name="apikey" placeholder="API Key" required />
            <button type="submit">Authenticate</button>
        </form>
    )
}