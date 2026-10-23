/** @type {import('next').NextConfig} */
const nextConfig = {};

// Sandbox preview only: the app is viewed through a proxy on a public host, and
// Next gates dev assets / HMR requests by origin. BASE44_PREVIEW_MODE is set by
// the Base44 platform; when it is absent (or any value other than "1") the
// default Next.js behaviour is kept unchanged.
if (
  process.env.BASE44_PREVIEW_MODE === "1" &&
  process.env.BASE44_PUBLIC_HOST_SUFFIX
) {
  nextConfig.allowedDevOrigins = [
    `3000-${process.env.BASE44_PUBLIC_HOST_SUFFIX}`,
  ];
}

export default nextConfig;
