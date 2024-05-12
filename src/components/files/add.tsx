import { cn } from "@/lib/utils";
import { DialogContent, DialogTrigger, Dialog, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

export default async function () {

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className={cn(
                        "bg-green-300 dark:bg-green-500 hover:bg-green-200 dark:hover:bg-green-400",
                        "p-2 rounded-md text-black duration-200"
                    )}
                    children="Add item to blob"
                />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Send file to blob</DialogTitle>
                    <DialogDescription>
                        oiii
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}