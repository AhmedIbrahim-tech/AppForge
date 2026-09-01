import { createBrowserRouter } from "react-router-dom";
import { WebsiteLayout } from "@/app/layouts/WebsiteLayout";
import { HomePage } from "@/app/pages/HomePage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import { generatedWebsiteRoutes } from "@/app/router/generated-routes";

export const appRouter = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      ...generatedWebsiteRoutes,
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
