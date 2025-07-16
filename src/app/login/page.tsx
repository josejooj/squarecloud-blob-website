'use client';
import { useActionState } from 'react'
import Main from '@/components/main';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImInfo } from "react-icons/im";
import { PiWarningBold } from "react-icons/pi";
import LoginAction from './action';
import { useFormStatus } from 'react-dom';

export default function Login() {

    const [error, action] = useActionState(LoginAction, undefined);

    return (
        <Main className='grid'>
            <div className='w-full grid place-items-center'>
                <div className='flex flex-col gap-2 w-full max-w-[600px] p-4'>
                    {error && (
                        <nav className='p-2 border-destructive dark:border-2 rounded-md flex items-center gap-2 text-sm font-semibold text-card-foreground bg-destructive/50 dark:bg-card'>
                            <PiWarningBold size={24} />
                            {error}
                        </nav>
                    )}
                    <form action={action} className='flex flex-col gap-4'>
                        <div className='flex flex-col sm:flex-row gap-2'>
                            <Input
                                type="password"
                                name="apikey"
                                placeholder="API Key"
                                required
                            />
                            <SubmitButton />
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

function SubmitButton() {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>Authenticate</Button>
    )
}