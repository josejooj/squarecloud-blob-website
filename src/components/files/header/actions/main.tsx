import ResponsivePopover from "@/components/ResponsivePopover";
import { Button } from "@/components/ui/button";
import AddFile from "./add";
import DeleteFiles from "./delete";

export default function Actions() {

    return (
        <ResponsivePopover
            trigger={<Button variant={'ghost'} className="border-2 w-full sm:w-fit">Actions</Button>}
        >
            <div className="text-sm font-medium text-center w-full mt-2 mb-4">Actions</div>
            <div className="flex flex-col gap-2">
                <AddFile />
                <DeleteFiles />
            </div>
        </ResponsivePopover>
    )
}