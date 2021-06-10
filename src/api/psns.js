import { request } from '../common/request'
import { config } from '../common/config'

const API_BASE_URL = config.psnsApiHost
const API_AUTH_URL = config.apiBaseUrl

// 通过token换取用户信息
export function GetUserInfoByToken({ token }) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/external/psns/v1/get/foreign/logininfo/v1?format=json`,
    query: {
      token,
    },
  })
}

// 获取组织机构树(含党员)
export function getOrgMemberTree({ token, orgId, orgCode }) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/external/psns/foreign/get/foreign/business/organiz/member/list/v1?format=json`,
    query: {
      Token: token,
      GloabId: orgId,
      Code: orgCode,
    },
  })
}

// 获取组织机构树
export function getOrgTree({ psnsToken, globalId }) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/external/psns/v1/get/foreign/organiz/tree/v1?format=json`,
    query: {
      Token: psnsToken,
      OrgGloabId: globalId,
    },
  })
}

// 获取组织机构树
export function getOrgList({ psnsToken, globalId, code, search }) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/external/psns/v1/get/foreign/organiz/tree/query/v1?format=json`,
    query: {
      Token: psnsToken,
      OrgGloabId: globalId,
      OrganizCode: code,
      KeyWord: search,
    },
  })
}

// 获取用户pc端管理权限
export function getUserAuthInfo() {
  return request({
    method: 'GET',
    url: `${API_AUTH_URL}/yd/admin/get`,
    query: {},
  })
}
