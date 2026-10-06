import { createBrowserRouter } from "react-router-dom";
import { WebsiteLayout } from "@/app/layouts/WebsiteLayout";
import { HomePage } from "@/app/pages/HomePage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import { generatedWebsiteRoutes } from "@/app/router/generated-routes";

import { FeatureBuilderPage } from "@/app/pages/FeatureBuilderPage";
import { ModuleExplorerPage } from "@/app/pages/ModuleExplorerPage";

export const appRouter = createBrowserRouter([
  {
    element: <WebsiteLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/features", element: <FeatureBuilderPage /> },
      { path: "/feature-builder", element: <FeatureBuilderPage /> },
      { path: "/modules", element: <ModuleExplorerPage /> },
      ...generatedWebsiteRoutes,
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
