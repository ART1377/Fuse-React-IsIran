import Test from './Test';

const TestConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'test',
      element: <Test />,
    },
  ],
};

export default TestConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
