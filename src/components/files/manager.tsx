'use client';
import { Object } from "@/interfaces/list";
import ListFiles from "./list";
import { FileProvider } from "./provider";
import { User } from "@/interfaces/user";

export default function FileManager({ objects, user }: { objects: Object[], user: User }) {
    return (
        <FileProvider>
            <ListFiles objects={objects} user={user} />
        </FileProvider>
    )
}