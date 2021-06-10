import { request } from '@/common/request'
import { config } from '@/common/config'

const API_BASE_URL = config.apiBaseUrl

export async function getInfoByToken() {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/admin/get`,
    query: {},
  })
}

export async function getTownList() {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/town/listTown`,
    query: {},
  })
}

export async function getVillageList({ townId }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/administrative/listAdministrative`,
    query: { townId },
  })
}
