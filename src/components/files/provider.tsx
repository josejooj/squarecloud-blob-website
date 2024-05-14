import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { RowSelectionState } from '@tanstack/react-table';

// Create a Context
const MyContext = createContext<FileContext>({ files: null, setFiles: () => { }, rowSelection: {}, setRowSelection: () => { } });

// Create a Provider component
export function FileProvider({ children }: { children: React.ReactNode }) {

    const [files, setFiles] = useState<File[] | null>(null);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

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
        <MyContext.Provider value={{ files, setFiles, rowSelection, setRowSelection }}>
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
    setFiles: React.Dispatch<React.SetStateAction<File[] | null>>,
    rowSelection: RowSelectionState,
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
}