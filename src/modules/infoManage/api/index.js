import { request } from '@/common/request'
import { config } from '@/common/config'

const API_BASE_URL = config.apiBaseUrl

//行政村接口请求
export async function getXZCInfo({townId,administrativeName,pageNum,pageSize}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/administrative/list`,
    query: {townId,administrativeName,pageNum,pageSize },
  })
}

export async function getXZCInfoById({administrativeId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/administrative/get`,
    query:{administrativeId},
  })
}

export async function getXZCInfoByTownsId({townId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/administrative/listAdministrative`,
    query:{townId},
  })
}

export async function saveXZCInfo(form){
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/administrative/save`,
    body: form
  })
}

export async function deleteXZCInfo({administrativeId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/administrative/remove`,
    query: {administrativeId},
  })
}

//自然村村接口请求
export async function getZRCInfo({administrativeId,keywords,pageIndex,pageNum}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/village/list`,
    query: {administrativeId,keywords,pageIndex,pageNum},
  })
}

export async function getZRCInfoByAdministrativeId({administrativeId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/village/listVillage`,
    query: {administrativeId},
  })
}

export async function getZRCInfoById({villageId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/village/get`,
    query: {villageId},
  })
}

export async function saveZRCInfo(form) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/village/save`,
    body:form
  })
}


export async function deleteZRCInfo({villageId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/village/remove`,
    query: {villageId},
  })
}

//乡镇接口请求
export async function getXZInfo({townName,pageSize,pageNum}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/town/list`,
    query: {townName,pageSize,pageNum},
  })
}

export async function getAllXZInfo() {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/town/listTown`,
  })
}

export async function saveXZInfo(form) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/town/save`,
    body: form,
  })
}

export async function getXZInfoById({townId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/town/get`,
    query: {townId},
  })
}

export async function deleteXZInfo({townId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/town/remove`,
    query: {townId},
  })
}
//权限认证
export async function getAuthority(){
	return request({
		method:'GET',
		url: `${API_BASE_URL}/yd/admin/get`,
	})
}
//判断是否挂在某个组织下
export async function getTake(){
	return request({
		method:'GET',
		url: `${API_BASE_URL}/yd/admin/take`,
	})
}