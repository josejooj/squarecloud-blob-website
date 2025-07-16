import { User } from "@/interfaces/user";
import { createHash } from "crypto";

export async function FetchUser(init: RequestInit): Promise<User> {

    const res = await fetch("https://api.squarecloud.app/v2/users/me", init);
    const user = await res.json().then(r => r.response.user) as User;
    const avatar_hash = createHash("sha256").update(user.email.trim().toLowerCase()).digest("hex");

    return Object.assign(user, { avatar: `https://gravatar.com/avatar/${avatar_hash}?d=mp&s=64` });

}