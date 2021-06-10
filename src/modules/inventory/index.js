import app from './app'

// 模块名称，导航的时候会用到
export const MODULE_NAME = 'inventory'

// 导出模块路由给基础框架调用，必须命名为 MODULE_ROUTE
export const MODULE_ROUTE = {
  component: app,
  children: [
        {
          path: 'itemList',
          name: 'itemList',
          component: () => import('./views/itemList'),
          meta: {
            sourceCode: [`${MODULE_NAME}_itemList`],
          },
        },
		{
		  path: 'questionList',
		  name: 'questionList',
		  component: () => import('./views/questionList'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_questionList`],
		  },
		},
		{
		  path: 'goodsList',
		  name: 'goodsList',
		  component: () => import('./views/goodsList'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_goodsList`],
		  },
		},
		{
		  path: 'talentList',
		  name: 'talentList',
		  component: () => import('./views/talentList'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_talentList`],
		  },
		},
		{
		  path: 'talentManage',
		  name: 'talentManage',
		  component: () => import('./views/talentManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_talentManage`],
		  },
		},
		{
		  path: 'questionManage',
		  name: 'questionManage',
		  component: () => import('./views/questionManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_questionManage`],
		  },
		},
		{
		  path: 'goodsManage',
		  name: 'goodsManage',
		  component: () => import('./views/goodsManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_goodsManage`],
		  },
		},
		{
		  path: 'itemManage',
		  name: 'itemManage',
		  component: () => import('./views/itemManage'),
		  meta: {
		    sourceCode: [`${MODULE_NAME}_itemManage`],
		  },
		},
      ],
}

export default {
  name: MODULE_NAME,
  title: '四清单管理',
  route: MODULE_ROUTE,
}
