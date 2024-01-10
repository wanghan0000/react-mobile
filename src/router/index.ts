import React from "react";

// 引入页面配置文件的上下文
const pageContext = require.context('../views', true, /config\.ts$/);

// 自动导出路由配置
const AutomaticGeneratedRoutes: any = [];

// 辅助函数，用于从页面路径中生成路由路径
const generateRoutePath = (pagePath: string) => {
  return pagePath.replace(/^\.\//, '').replace(/\/config\.ts$/, '');
};

// 辅助函数，用于构建路由对象
const buildRouteObject = (pagePath: string, pageConfig: any) => {
  const routePath = generateRoutePath(pagePath);
  const route = {
    path: `/${routePath.replace(/\//g, '/')}`,
    component: React.lazy(() => import(`../views/${routePath}`)),
    ...pageConfig.default
  };
  return route;
};

// 辅助函数，用于检查是否为子路由
const isChildRoute = (pagePath: string) => {
  return pagePath.split('/').length > 2;
};

// 循环每一个找到的配置文件路径
pageContext.keys().forEach((pagePath) => {
  try {
    const pageConfig = pageContext(pagePath);
    if (isChildRoute(pagePath)) {
      // 子路由
      const routePathSplit = generateRoutePath(pagePath).split('/');
      const parentRouteName = routePathSplit[0];
      const childRoute = buildRouteObject(pagePath, pageConfig);

      // 查找或创建父路由
      let parentRoute = AutomaticGeneratedRoutes.find((route: { name: string; }) => route.name === parentRouteName);
      if (!parentRoute) {
        parentRoute = {
          name: parentRouteName,
          path: `/${parentRouteName}`,
          component: React.lazy(() => import(`../views/${parentRouteName}`)),
          children: []
        };
        AutomaticGeneratedRoutes.push(parentRoute);
      }
      if(childRoute?.path === parentRoute?.path && childRoute?.defaultRoute) {
         parentRoute.defaultRoute = childRoute.defaultRoute;
      }

      if (childRoute.path !== parentRoute.path) {
        // 添加子路由到父路由的 children 数组
        parentRoute.children.push(childRoute);
      }
    } else {
      // 父路由
      const route = buildRouteObject(pagePath, pageConfig);
      route.name = route.path.substring(1); // 假设路由名称是路径的第一部分
      AutomaticGeneratedRoutes.push(route);
    }
  } catch (error) {
    console.error(`导入配置文件出错 ${pagePath}:`, error);
  }
});

export default AutomaticGeneratedRoutes;
