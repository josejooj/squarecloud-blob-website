const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export function formatBytes(n: number) {
    const i = Math.floor(Math.log(n) / Math.log(1024));
    return parseFloat((n / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}