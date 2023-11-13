import { lazy } from "react";

// eslint-disable-next-line import/extensions
const ActionPage = lazy(() => import("./Action"));

const ActionPageConfig = {
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
          path: "action",
          element: <ActionPage />,
        },
      ],
    },
  ],
};

export default ActionPageConfig;
