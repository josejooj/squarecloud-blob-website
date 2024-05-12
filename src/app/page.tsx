import Main from "@/components/main";
import FileManager from "@/components/files/manager";
import User from "@/components/user";

export default function Home() {

  return (
    <Main className="py-8 flex flex-col gap-4">
      <User />
      <FileManager />
    </Main>
  );
}
