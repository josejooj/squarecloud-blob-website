import { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gravatar.com",
                port: ""
            }
        ]
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/login",
                missing: [{ type: "cookie", key: "apikey" }],
                permanent: false
            }
        ]
    },
};

export default nextConfig;
