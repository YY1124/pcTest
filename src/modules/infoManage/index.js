import app from './app'

// 模块名称，导航的时候会用到
export const MODULE_NAME = 'infoManage'

// 导出模块路由给基础框架调用，必须命名为 MODULE_ROUTE
export const MODULE_ROUTE = {
  component: app,
  children: [
        {
          path: 'XZC-info',
          name: 'XZC-info',
          component: () => import('./views/XZC-info'),
          meta: {
            sourceCode: [`${MODULE_NAME}_XZC-info`],
          },
        },
		{
		  path: 'ZRC-info',
		  name: 'ZRC-info',
		  component: () => import('./views/ZRC-info'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_ZRC-info`],
		  },
		},
		{
		  path: 'XZ-info',
		  name: 'XZ-info',
		  component: () => import('./views/XZ-info'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_XZ-infoManage`],
		  },
		},
		{
		  path: 'XZ-infoManage',
		  name: 'XZ-infoManage',
		  component: () => import('./views/XZ-infoManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_XZ-infoManage`],
		  },
		},
		{
		  path: 'XZC-infoManage',
		  name: 'XZC-infoManage',
		  component: () => import('./views/XZC-infoManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_XZC-infoManage`],
		  },
		},
		{
		  path: 'ZRC-infoManage',
		  name: 'ZRC-infoManage',
		  component: () => import('./views/ZRC-infoManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_ZRC-infoManage`],
		  },
		},
      ],
}

export default {
  name: MODULE_NAME,
  title: '自然村管理',
  route: MODULE_ROUTE,
}
