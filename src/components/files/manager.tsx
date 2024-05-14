'use client';
import AddFile from "./add";
import DeleteFiles from "./delete";
import ListFiles from "./list";
import { FileProvider } from "./provider";

export default function FileManager() {
    return (
        <FileProvider>
            <div className="flex flex-col gap-2">
                <nav className="flex items-center gap-2">
                    <AddFile />
                    <DeleteFiles />
                </nav>
                <ListFiles />
            </div>
        </FileProvider>
    )
}