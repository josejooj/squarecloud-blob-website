import AddFile from "./add";

export default async function FileManager() {
    return (
        <div className="flex flex-col gap-2">
            <nav>
                <AddFile />
            </nav>
            <table>
                
            </table>
        </div>
    )
}