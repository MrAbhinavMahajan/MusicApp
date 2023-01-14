import * as React from 'react';

export const navigationRef = React.createRef();

export function getCurrentRouteName() {
  return navigationRef?.current?.getCurrentRoute()?.name;
}

export function getCurrentRoute() {
  return navigationRef?.current?.getCurrentRoute();
}

export function navigate(name, params = {}) {
  navigationRef?.current?.navigate(name, params);
}

export const changeStack = stackName => {
  resetRoot(stackName);
};

export const resetRoot = route => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{name: route}],
  });
};
