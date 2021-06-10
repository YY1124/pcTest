import { request } from '@/common/request'
import { config } from '@/common/config'

const API_BASE_URL = config.apiBaseUrl

export async function getSourceList({ orgCode, search, page, pageSize, typeId, showState }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/ws/api/v1/learnRes/list`,
    query: { orgCode, search, page, pageSize, typeId, showState },
  })
}

export async function getSourceDetail({ id }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/ws/api/v1/learnRes/info/${id}`,
  })
}

export async function saveSource(form) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/ws/api/v1/learnRes/save`,
    body: form,
  })
}

export async function deleteSource({ id }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/ws/api/v1/learnRes/delete/${id}`,
  })
}

export async function modifyStatus({ id }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/ws/api/v1/learnRes/show/${id}`,
  })
}

export async function getSourceRecordList({ orgCode, search, page, pageSize, resId }) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/ws/api/v1/learnRecord/list`,
    query: { orgCode, search, page, pageSize, resId },
  })
}
