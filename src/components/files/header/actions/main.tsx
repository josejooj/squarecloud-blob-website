import ResponsivePopover from "@/components/ResponsivePopover";
import { Button } from "@/components/ui/button";
import UploadFile from "./upload/main";
import DeleteFiles from "./delete";
import { type Object } from "@/interfaces/list";
import { User } from "@/interfaces/user";

export default function Actions({ objects, user }: { objects: Object[], user: User }) {

    return (
        <ResponsivePopover
            trigger={<Button variant={'ghost'} className="border-2 w-full sm:w-fit">Actions</Button>}
        >
            <div className="text-sm font-medium text-center w-full mt-2 mb-4">Actions</div>
            <div className="flex flex-col gap-2">
                <UploadFile />
                <DeleteFiles objects={objects} user={user} />
            </div>
        </ResponsivePopover>
    )
}