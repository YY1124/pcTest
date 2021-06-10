import { request } from '@/common/request'
import { config } from '@/common/config'

const API_BASE_URL = config.apiBaseUrl

export async function getList({ regionId, search, page, pageSize, problemType, dealStatus }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/api/problemReport/list`,
    query: { regionId, search, page, pageSize, problemType, dealStatus },
  })
}

export async function getDetail({ id }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/api/problemReport/info/${id}`,
  })
}

export async function deleteData({ id }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/api/problemReport/delete/${id}`,
  })
}
