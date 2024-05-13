import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create a Context
const MyContext = createContext<FileContext>({ files: [{ name: "teste", created_at: new Date(), size: 1024 }], setFiles: () => { } });

// Create a Provider component
export function FileProvider({ children }: { children: React.ReactNode }) {

    const [files, setFiles] = useState<File[] | null>(null);

    useEffect(() => {

        const fetcher = async () => {

            const response = await fetch("https://blob.squarecloud.app/v1/list", {
                headers: { Authorization: Cookies.get("apikey")! }
            }).catch(e => e);

            const data = await response.json?.().catch(() => { }) || {};

            if (response.status !== 200 || !data.response.objects) return;

            for (const object of data.response.objects) {
                object.created_at = new Date(object.created_at)
            }

            setFiles(data.response.objects);

        }

        fetcher();

    }, [])

    return (
        <MyContext.Provider value={{ files, setFiles }}>
            {children}
        </MyContext.Provider>
    );
}

// Create a custom hook for convenience
export function useFileContext() {
    return useContext(MyContext);
}

export interface File {
    name: string,
    created_at: Date,
    size: number
}

export interface FileContext {
    files: File[] | null,
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}