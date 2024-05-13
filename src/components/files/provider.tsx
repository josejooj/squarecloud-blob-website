import React, { createContext, useState, useContext } from 'react';

// Create a Context
const MyContext = createContext<FileContext>({ files: null, setFiles: () => { } });

// Create a Provider component
export function FileProvider({ children }: { children: React.ReactNode }) {

    const [files, setFiles] = useState<File[] | null>(null);

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