import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/appointments/create-booking": ["./public/**/*.pdf"],
  },
};

export default nextConfig;
