'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GrStatusWarning } from "react-icons/gr";
import Cookies from 'js-cookie';
import Main from '@/components/main';

export default function Login() {

    const router = useRouter()
    const [error, setError] = useState<string>('')
    const [fetching, setFetching] = useState<boolean>(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        setFetching(true);

        const formData = new FormData(event.currentTarget)
        const apikey = formData.get('apikey')!.toString()
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': apikey
            }
        });

        if (response.ok) {
            Cookies.set("apikey", apikey, { secure: true, sameSite: "strict" })
            router.push('/')
        } else {

            const data = await response.json();

            setError(data.message);

        }

        setFetching(false);

    }

    return (
        <Main className='grid'>
            <div className='w-full grid place-items-center'>
                <div className='flex flex-col gap-2 w-full max-w-[600px]'>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4 dark:bg-zinc-800 bg-gray-200 rounded-md p-4'>
                        <input
                            type="password"
                            name="apikey"
                            placeholder="API Key"
                            required
                            className='p-2 rounded-md'
                        />
                        <button
                            type="submit"
                            disabled={fetching}
                            className='dark:font-medium'
                        >Authenticate</button>
                    </form>
                    {error && (
                        <nav className='p-2 dark:bg-red-950 bg-red-200 rounded-md flex items-center gap-2 text-sm font-medium dark:text-gray-200'>
                            <GrStatusWarning size={24} />
                            {error}
                        </nav>
                    )}
                </div>
            </div>
        </Main>
    )
}