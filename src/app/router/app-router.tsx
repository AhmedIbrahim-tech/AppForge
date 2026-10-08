import { createBrowserRouter } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { WebsiteLayout } from "@/app/layouts/WebsiteLayout";
import { HomePage } from "@/app/pages/HomePage";
import { BuilderPage } from "@/app/pages/BuilderPage";
import { FeatureBuilderPage } from "@/app/pages/FeatureBuilderPage";
import { ModuleExplorerPage } from "@/app/pages/ModuleExplorerPage";
import { WhyFlatronPage } from "@/app/pages/WhyFlatronPage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import { generatedWebsiteRoutes } from "@/app/router/generated-routes";

// Docs components
import { DocsLayout } from "@/features/docs/components/DocsLayout";
import { DocsHomePage } from "@/features/docs/pages/DocsHomePage";
import { WhatIsFlatronPage } from "@/features/docs/pages/WhatIsFlatronPage";
import { WhoIsFlatronForPage } from "@/features/docs/pages/WhoIsFlatronForPage";
import { QuickStartPage } from "@/features/docs/pages/QuickStartPage";
import { HowFlatronWorksPage } from "@/features/docs/pages/HowFlatronWorksPage";
import { StackBuilderDocPage } from "@/features/docs/pages/StackBuilderDocPage";
import { FeatureBuilderDocPage } from "@/features/docs/pages/FeatureBuilderDocPage";
import { ModulesDocPage } from "@/features/docs/pages/ModulesDocPage";
import { FeatureVsModulePage } from "@/features/docs/pages/FeatureVsModulePage";

export const routes: RouteObject[] = [
  {
    element: <WebsiteLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/builder", element: <BuilderPage /> },
      { path: "/features", element: <FeatureBuilderPage /> },
      { path: "/feature-builder", element: <FeatureBuilderPage /> },
      { path: "/modules", element: <ModuleExplorerPage /> },
      { path: "/why-flatron", element: <WhyFlatronPage /> },
      {
        path: "/docs",
        element: <DocsLayout />,
        children: [
          { index: true, element: <DocsHomePage /> },
          { path: "what-is-flatron", element: <WhatIsFlatronPage /> },
          { path: "who-is-flatron-for", element: <WhoIsFlatronForPage /> },
          { path: "quick-start", element: <QuickStartPage /> },
          { path: "how-flatron-works", element: <HowFlatronWorksPage /> },
          { path: "stack-builder", element: <StackBuilderDocPage /> },
          { path: "feature-builder", element: <FeatureBuilderDocPage /> },
          { path: "modules", element: <ModulesDocPage /> },
          { path: "feature-vs-module", element: <FeatureVsModulePage /> },
        ],
      },
      ...generatedWebsiteRoutes,
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export const createAppRouter = () => createBrowserRouter(routes);

export const appRouter =
  typeof document !== "undefined"
    ? createBrowserRouter(routes)
    : (null as unknown as ReturnType<typeof createBrowserRouter>);
