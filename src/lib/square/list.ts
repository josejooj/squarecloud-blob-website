import { Object } from "@/interfaces/list";

export async function FetchObjectsList(init: RequestInit): Promise<Object[]> {

    const res = await fetch("https://blob.squarecloud.app/v1/objects", init);
    const objects = await res.json().then(r => r.response.objects) as Object[];

    return objects;

}