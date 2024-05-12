import Main from "@/components/main";
import FileManager from "@/components/files/manager";
import { User, UserSkeleton } from "@/components/user";
import { Suspense } from "react";

export default function Home() {

  return (
    <Main className="py-8 flex flex-col gap-4">
      <Suspense fallback={<UserSkeleton />}><User /></Suspense>
      <FileManager />
    </Main>
  );
}
