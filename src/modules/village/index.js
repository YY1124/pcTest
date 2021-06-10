import app from './app'

// 模块名称，导航的时候会用到
export const MODULE_NAME = 'village'

// 导出模块路由给基础框架调用，必须命名为 MODULE_ROUTE
export const MODULE_ROUTE = {
  component: app,
  children: [
    {
      path: 'list',
      name: 'village',
      component: () => import('./views/index'),
      meta: {
        sourceCode: `${MODULE_NAME}_village`,
      },
      children: [
        {
          path: 'edit',
          name: 'village_edit',
          component: () => import('./views/edit'),
          meta: {
            sourceCode: [`${MODULE_NAME}_village_create`],
          },
        },
      ],
    },
  ],
}

export default {
  name: MODULE_NAME,
  title: '自然村管理',
  route: MODULE_ROUTE,
}
