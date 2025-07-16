'use client';
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import Main from '@/components/main';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImInfo } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";

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
                <div className='flex flex-col gap-2 w-full max-w-[600px] p-4'>
                    {error && (
                        <nav className='p-2 border-destructive dark:border-2 dark:bg-transparent bg-destructive/50 rounded-md flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                            <PiWarningBold size={24} />
                            {error}
                        </nav>
                    )}
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-col sm:flex-row gap-2'>
                            <Input
                                type="password"
                                name="apikey"
                                placeholder="API Key"
                                required
                            />
                            <Button
                                variant='default'
                                type="submit"
                                disabled={fetching}
                            >Authenticate</Button>
                        </div>
                        <div className='text-muted-foreground flex gap-2 items-center text-xs'>
                            <ImInfo />
                            <div>
                                <span>If you want, you can consult the code in our</span>
                                &nbsp;
                                <a href="https://github.com/josejooj/squarecloud-blob-website" className='underline text-blue-400'>official repository</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Main>
    )
}