import { ObjectStats, ObjectStatsResponse } from "@/interfaces/stats";

export async function FetchObjectStats(init: RequestInit): Promise<ObjectStatsResponse> {

    const res = await fetch("https://blob.squarecloud.app/v1/account/stats", init);
    const stats = await res.json().then(r => r.response) as ObjectStats

    return {
        stats,
        revalidate: () => FetchObjectStats(init)
    };

}
