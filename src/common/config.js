let BASE_HOST = 'http://39.129.10.53'
const DEBUG = true
if (DEBUG) {
  BASE_HOST = 'http://192.168.100.29:8888'
}

export const config = {
  apiBaseUrl: `${BASE_HOST}`,
  psnsApiHost: 'https://apitestpsns.ccphl.com', // 网上党支部接口地址
  uploadUrl: `${BASE_HOST}/yd/api/attachment/upload`, // 文件上传接口
  mapKey: 'af82981cdf0786651a8a72d48feaaaa5',
  // 网上党支部党员接口token
  psnsToken: '',
  /**
   * 获取模块的路由名称（每个模块的路由在注册的时候都会添加前缀）
   * @param {string} moduleName 模块名称
   * @param {string} routeName 路由名称（不传该参数的话返回模块的路由名称）
   */
  getModuleRouteName(moduleName, routeName) {
    return `__DEMACIA_MODULE_${moduleName}__${routeName || ''}`
  },
}

export default {
  install: Vue => {
    Vue.prototype.$config = config
  },
}
