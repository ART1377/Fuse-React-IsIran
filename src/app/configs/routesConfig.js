import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import Loader from 'app/theme-layouts/layout4/components/Loader/Loader';
import Error404Page from '../main/404/Error404Page';
// import SignInConfig from '../main/sign-in/SignInConfig';
// import SignUpConfig from '../main/sign-up/SignUpConfig';
// import SignOutConfig from '../main/sign-out/SignOutConfig';
// import ExampleConfig from '../main/example/ExampleConfig';
// import TestConfig from '../main/test/TestConfig';
// import Test from '../main/test/Test';
import pagesConfigs from '../main/pages/management/PagesConfig';

const routeConfigs = [
  // ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig, TestConfig,
  ...pagesConfigs];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    // element: <Navigate to="/test" />,
    element: <Navigate to="/pages/management/system" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    // element: <h1>loading ...........</h1>,
    element: <Loader />,
  },
  // {
  //   path: 'test',
  //   element: <Test />,
  // },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;
