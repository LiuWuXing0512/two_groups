// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/86137/Desktop/新建文件夹 (2)/two_gtoups/mall_admin/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.tsx').default
  },
  {
    "path": "/login",
    "exact": true,
    "component": require('@/pages/login.tsx').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
