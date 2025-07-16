import Main from "@/components/main";
import FileManager from "@/components/files/manager";
import { UserDetails } from "@/components/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FetchUser } from "@/lib/square/user";
import { FetchObjectStats } from "@/lib/square/stats";
import { FetchObjectsList } from "@/lib/square/list";

export default async function Home() {

  const cookie = await cookies();
  const api_key = cookie.get("token")?.value;
  const user_id = api_key?.split("-")[0];
  const init = (tag: string) => ({
    headers: { Authorization: api_key! },
    next: {
      tags: [tag + "." + user_id],
      revalidate: 60
    }
  })

  const [user, stats, objects] = await Promise.all([
    FetchUser(init("user")),
    FetchObjectStats(init("stats")),
    FetchObjectsList(init("objects"))
  ]);

  if (!user || !stats || !objects) {
    cookie.delete("token");
    redirect("/login");
  }

  return (
    <Main className="pt-8 pb-4 flex flex-col gap-4">
      <UserDetails user={user} stats={stats} />
      <FileManager user={user} objects={objects} />
    </Main>
  );
}