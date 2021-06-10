import { config } from '../common/config'

function getModuleRouteFromModule(module) {
  const walkRoute = route => {
    const children = route.children?.map(walkRoute) || []

    children.push({
      path: '*',
    })

    return {
      path: route.path,
      name: config.getModuleRouteName(module.name, route.name),
      component: route.component,
      meta: route.meta,
      children,
    }
  }

  const route = walkRoute(module.route)

  return {
    path: module.name,
    name: config.getModuleRouteName(module.name),
    component: route.component,
    meta: route.meta,
    children: route.children,
  }
}

export default function (modules) {
  return modules.map(item => getModuleRouteFromModule(item))
}
