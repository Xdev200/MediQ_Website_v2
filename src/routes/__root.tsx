import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import appCss from "../styles.css?url";

const APP_NAME = "MediQ — Connected Health Coach";
const APP_DESC =
  "MediQ — Your connected AI health coach. Track vitals, nutrition, sleep, activity and more. Available on Android.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: APP_DESC },
      { name: "theme-color", content: "#F3F6F7" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: APP_DESC },
      { property: "og:image", content: "/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/icon.png" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "apple-touch-icon", href: "/icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <SmoothScroll>
          <Outlet />
        </SmoothScroll>
        <Scripts />
      </body>
    </html>
  ),
});
