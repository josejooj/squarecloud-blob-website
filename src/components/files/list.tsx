'use client';
import { Label } from "../ui/label";
import { useFileContext } from "./provider";

export default function ListFiles() {

    const { files } = useFileContext();

    if (files === null) return (
        <Label className="w-full py-8 text-center">
            Loading files...
        </Label>
    )

    return (
        <div />
    )
}