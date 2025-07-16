import { Object, ObjectListResponse } from "@/interfaces/list";

export async function FetchObjectsList(init: RequestInit): Promise<ObjectListResponse> {

    const res = await fetch("https://blob.squarecloud.app/v1/objects", init);
    const objects = await res.json().then(r => r.response.objects) as Object[];

    return {
        objects,
        revalidate: () => FetchObjectsList(init)
    };

}