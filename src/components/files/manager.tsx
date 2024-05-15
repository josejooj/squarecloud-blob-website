'use client';
import ListFiles from "./list";
import { FileProvider } from "./provider";

export default function FileManager() {
    return (
        <FileProvider>
            <ListFiles />
        </FileProvider>
    )
}