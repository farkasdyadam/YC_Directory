import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {// Így engedélyezzük hogy elérje az adott útvonalat és ne dobjon hibát a képek külsső forrásból való betöltésekor!
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*"
            }
        ]
    },
    devIndicators:{
        appIsrStatus:true,
        buildActivity:true,
        buildActivityPosition:'bottom-right',
    }
};

export default nextConfig;
