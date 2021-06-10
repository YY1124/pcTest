import axios from './common_axios'
import Axios from 'axios'
import { config } from '../../common/config.js'
import storage from '@/common/store/storage'

// export const ORG_TREE = 'https://psnsadmin.1237125.cn/api/organiz/normalize/other/org/tree/filter'
export const ORG_TREE =
  'https://mstest.ylxf.1237125.cn/apiv1/organiz/normalize/other/org/tree/filter'

const QUERY_ORGS = `${config.psnsApiHost}/external/psns/v1/get/foreign/organiz/tree/query/v1?format=json`

const QUERY_USERS = `${config.psnsApiHost}/external/psns/ylxf/pc/get/partymember/list/exclude/old/v1`

/**
 *
 * @param {*} orgId
 * @param {*} filterType 过滤类型，默认0不过滤，1过滤总支，2过滤支部，3过滤总支、支部
 */
export async function loadOrgChildren(orgId, filterType = 0) {
  return axios
    .get(ORG_TREE, {
      params: {
        orgGloabId: orgId,
        filterType,
      },
    })
    .then(res => res.data.Data)
}

export async function loadOrgChildrenForTree(orgId, filterType = 0) {
  if (!orgId) {
    const { OrgCode, OrgGlobalId, OrgName, ParentGlobalId, RegionId } = storage.userInfo
    return [
      {
        label: OrgName,
        id: OrgGlobalId,
        isLeaf: false,
        data: {
          OrgCode: OrgCode,
          OrgFullName: OrgName,
          OrgId: OrgGlobalId,
          ParentOrgId: ParentGlobalId,
          RegionId,
          HasChildren: true,
        },
      },
    ]
  }
  return loadOrgChildren(orgId, filterType).then(orgs =>
    orgs.map(i => ({
      label: i.OrgFullName,
      id: i.OrgId,
      isLeaf: !i.HasChildren,
      data: i,
    }))
  )
}

export async function queryOrg({ Token, OrgGloabId, OrganizCode, KeyWord }) {
  const axios = Axios.create()
  return axios
    .post(QUERY_ORGS(OrganizCode), {
      Token: Token,
      OrgGlobalId: OrgGloabId,
      OrganizCode: OrganizCode,
      KeyWord: KeyWord,
    })
    .then(res => res.data)
}

export async function getOrgUsers({
  Token,
  RegionId,
  OrganizGloabId,
  OrgCode,
  PartyMemberType = 0,
  IsFilter = 1,
  IsFilterOld = 1,
}) {
  const axios = Axios.create()
  return axios
    .post(QUERY_USERS(OrgCode), {
      Token,
      RegionId,
      OrganizGloabId,
      PartyMemberType,
      IsFilter,
      IsFilterOld,
    })
    .then(res => res.data)
}
