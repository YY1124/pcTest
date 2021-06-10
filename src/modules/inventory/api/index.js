import { request } from '@/common/request'
import { config } from '@/common/config'

const API_BASE_URL = config.apiBaseUrl

//货物清单接口请求
export async function getGoodsInfo({villageId,projectName,pageNum,pageSize}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/list`,
    query: {villageId,projectName,pageNum,pageSize},
  })
}

export async function getGoodsInfoById({goodsId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/get`,
    query: {goodsId},
  })
}

export async function saveGoodsInfo(form){
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/goods/save`,
    body: form
  })
}
//物资现有规模接口请求
export async function getGoodsScaleInfo({goodsId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/scale/list`,
    query: {goodsId},
  })
}

export async function getGoodsScaleInfoById({goodsScaleId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/scale/get`,
    query: {goodsScaleId},
  })
}

export async function saveGoodsScaleInfo(form){
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/goods/scale/save`,
    body: form
  })
}

export async function deleteGoodsScaleInfo({goodsScaleId}) {
  return request({
    method: 'DELETE',
    url: `${API_BASE_URL}/yd/goods/scale/remove`,
    query: {goodsScaleId},
  })
}

//水资源接口请求
export async function getGoodsWaterInfo({goodsId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/water/list`,
    query: {goodsId},
  })
}

export async function getGoodsWaterInfoById({goodsWaterId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/water/get`,
    query: goodsWaterId,
  })
}

export async function saveGoodsWaterInfo(form){
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/goods/water/save`,
    body: form
  })
}

export async function deleteGoodsWaterInfo(goodsWaterId) {
  return request({
    method: 'DELETE',
    url: `${API_BASE_URL}/yd/goods/water/remove`,
    query: {goodsWaterId},
  })
}

//旅游资源接口请求
export async function getGoodsTravelInfo(goodsId) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/travel/list`,
    query: goodsId,
  })
}

export async function getGoodsTravelInfoById({goodsTravelId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/goods/travel/get`,
    query: {goodsTravelId},
  })
}

export async function saveGoodsTravelInfo(form){
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/goods/travel/save`,
    body: form
  })
}

export async function deleteGoodsTravelInfo({goodsTravelId}) {
  return request({
    method: 'DELETE',
    url: `${API_BASE_URL}/yd/goods/travel/remove`,
    query: {goodsTravelId},
  })
}
//项目清单接口请求
export async function getItemInfo({villageId,projectName,pageIndex,pageNum}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/project/list`,
    query: {villageId,projectName,pageIndex,pageNum },
  })
}

export async function getItemInfoById({projectId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/project/get`,
    query: {projectId},
  })
}

export async function saveItemInfo(form) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/project/save`,
    body:form
  })
}

export async function deleteItemInfo({projectId}) {
  return request({
    method: 'DELETE',
    url: `${API_BASE_URL}/yd/project/remove`,
    query: {projectId},
  })
}

//问题清单接口请求
export async function getQuestionInfo({villageId,questionDutyPerson,pageSize,pageNum}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/question/list`,
    query: {villageId,questionDutyPerson,pageSize,pageNum},
  })
}

export async function saveQuestionInfo(form) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/question/save`,
    body: form,
  })
}

export async function getQuestionInfoById({questionId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/question/get`,
    query: {questionId},
  })
}

export async function deleteQuestionInfo({questionId}) {
  return request({
    method: 'DELETE',
    url: `${API_BASE_URL}/yd/question/remove`,
    query: {questionId},
  })
}
//人才清单接口请求
export async function getTalentInfo({villageId,talentName,pageSize,pageNum}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/talent/list`,
    query: {villageId,talentName,pageSize,pageNum},
  })
}

export async function saveTalentInfo(form) {
  return request({
    method: 'POST',
    url: `${API_BASE_URL}/yd/talent/save`,
    body: form,
  })
}

export async function getTalentInfoById({talentId}) {
  return request({
    method: 'GET',
    url: `${API_BASE_URL}/yd/talent/get`,
    query: {talentId},
  })
}

export async function deleteTalentInfo({talentId}) {
  return request({
    method: 'DELETE',
    url: `${API_BASE_URL}/yd/talent/remove`,
    query: {talentId},
  })
}