import FuseLoading from '@fuse/core/FuseLoading';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import Loader from 'app/theme-layouts/layout4/components/Loader/Loader';

/**
 * React Suspense defaults
 * For to Avoid Repetition
 */ function FuseSuspense(props) {
  return <Suspense fallback={<Loader />}>{props.children}</Suspense>;
}

FuseSuspense.propTypes = {
  loadingProps: PropTypes.object,
};

FuseSuspense.defaultProps = {
  loadingProps: {
    delay: 0,
  },
};

export default FuseSuspense;
