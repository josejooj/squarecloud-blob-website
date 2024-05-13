'use client';
import AddFile from "./add";
import ListFiles from "./list";
import { FileProvider } from "./provider";

export default function FileManager() {
    return (
        <FileProvider>
            <div className="flex flex-col gap-2">
                <nav>
                    <AddFile />
                </nav>
                <ListFiles />
            </div>
        </FileProvider>
    )
}