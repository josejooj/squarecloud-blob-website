import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { ColumnFiltersState, RowSelectionState } from '@tanstack/react-table';

const FileContext = createContext<FileContext | null>(null);
const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [files, setFiles] = useState<File[] | null>(null);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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
        <FileContext.Provider value={{ files, setFiles, rowSelection, setRowSelection, columnFilters, setColumnFilters }}>
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
}

export {
    FileProvider,
    useFileContext
}