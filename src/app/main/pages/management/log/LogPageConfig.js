import { lazy } from "react";

// eslint-disable-next-line import/extensions
const LogPage = lazy(() => import("./Log"));

const LogPageConfig = {
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
          path: "log",
          element: <LogPage />,
        },
      ],
    },
  ],
};

export default LogPageConfig;
