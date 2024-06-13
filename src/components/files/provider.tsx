import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { ColumnFiltersState, RowSelectionState } from '@tanstack/react-table';

interface GetListFilesResponse {
    status: "success" | "error"
    response: {
        objects: Array<File>,
        continuationToken?: string
    }
}

const FileContext = createContext<FileContext | null>(null);
const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [files, setFiles] = useState<File[] | null>(null);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const continuationToken = useRef<string>("");
    const fetching = useRef<boolean>(false);
    const fetchFiles = async () => {

        if (fetching.current) return;

        fetching.current = true

        try {

            const url = new URL("https://blob.squarecloud.app/v1/objects");

            if (continuationToken.current) url.searchParams.append('continuationToken', continuationToken.current);
            else if (files?.length) return;

            const response = await fetch(url.toString(), {
                headers: { Authorization: Cookies.get("apikey")! }
            });

            const data: GetListFilesResponse = await response.json();

            if (response.status === 200 && data.response.objects) {

                for (const object of data.response.objects) {
                    object.created_at = new Date(object.created_at)
                }

                setFiles(c => c === null ? data.response.objects : [...c, ...data.response.objects]);

                continuationToken.current = data.response.continuationToken || ""

            }

        } catch (e) {

        }

        fetching.current = false;

    }

    useEffect(() => { fetchFiles(); }, [])

    return (
        <FileContext.Provider value={{ files, setFiles, rowSelection, setRowSelection, columnFilters, setColumnFilters, fetchFiles }}>
            {children}
        </FileContext.Provider>
    );
}

const useFileContext = () => {

    const context = useContext(FileContext);

    if (!context) throw new Error('useFileContext must be used within a FileProvider');
    return context;

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
    columnFilters: ColumnFiltersState,
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    fetchFiles: () => Promise<any>
}

export {
    FileProvider,
    useFileContext
}