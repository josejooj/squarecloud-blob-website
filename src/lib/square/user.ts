import { User, UserResponse } from "@/interfaces/user";
import { createHash } from "crypto";

export async function FetchUser(init: RequestInit): Promise<UserResponse> {

    const res = await fetch("https://api.squarecloud.app/v2/users/me", init);
    const user = await res.json().then(r => r.response.user) as User;
    const avatar_hash = createHash("sha256").update(user.email.trim().toLowerCase()).digest("hex");
    const avatar = `https://gravatar.com/avatar/${avatar_hash}?d=mp&s=64`;

    return {
        user,
        avatar,
        revalidate: () => FetchUser(init)
    };

}