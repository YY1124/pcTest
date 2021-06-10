import app from './app'

// 模块名称，导航的时候会用到
export const MODULE_NAME = 'idea'

// 导出模块路由给基础框架调用，必须命名为 MODULE_ROUTE
export const MODULE_ROUTE = {
  component: app,
  children: [
    {
      path: 'list',
      name: 'idea',
      component: () => import('./views/index'),
      meta: {
        sourceCode: `${MODULE_NAME}_idea`,
      },
      children: [
        {
          path: 'edit',
          name: 'idea_edit',
          component: () => import('./views/edit'),
          meta: {
            sourceCode: [`${MODULE_NAME}_idea_create`],
          },
        },
        {
          path: 'detail',
          name: 'idea_detail',
          component: () => import('./views/detail'),
          meta: {
            sourceCode: [`${MODULE_NAME}_idea_detail`],
          },
        },
      ],
    },
  ],
}

export default {
  name: MODULE_NAME,
  title: '问计于民',
  route: MODULE_ROUTE,
}
