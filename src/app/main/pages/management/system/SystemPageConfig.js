import { lazy } from "react";

// eslint-disable-next-line import/extensions
const SystemPage = lazy(() => import("./System"));

const SystemPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "pages/management",
      children: [
        {
          path: "system",
          element: <SystemPage />,
        },
      ],
    },
  ],
};

export default SystemPageConfig;
