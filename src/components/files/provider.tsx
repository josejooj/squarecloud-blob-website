import React, { createContext, useState, useContext } from 'react';
import { ColumnFiltersState, RowSelectionState } from '@tanstack/react-table';

const FileContext = createContext<FileContext | null>(null);
const FileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    return (
        <FileContext.Provider value={{ rowSelection, setRowSelection, columnFilters, setColumnFilters }}>
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
    id: string,
    created_at: Date,
    size: number
}

export interface FileContext {
    rowSelection: RowSelectionState,
    setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>
    columnFilters: ColumnFiltersState,
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
}

export {
    FileProvider,
    useFileContext
}