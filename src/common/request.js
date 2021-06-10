import qs from 'qs'
import storage from './store/storage'
import FileSaver from 'file-saver'

async function ajax({ method, url, header = {}, query, body }) {
  if (['GET', 'POST'].indexOf(method) === -1) {
    throw new Error('Invalid reqeust method')
  }

  if (storage.psnsToken) {
    header['Authorization'] = storage.psnsToken
  }

  query = { ...query }
  url = addQueryToUrl(url, query)

  if (typeof body === 'object' && !(body instanceof FormData)) {
    body = JSON.stringify(body)
    header['Content-Type'] = 'application/json'
  }

  const opts = {
    method,
    headers: {
      ...header,
    },
    body,
  }

  return fetch(url, opts)
}

export async function request({ method, url, header = {}, query, body }) {
  const res = await ajax({
    method,
    url,
    header: {
      ...header,
    },
    query,
    body,
  })
  const json = await res.json()

  if (
    res.status === 200 &&
    (json?.stateCode === 200 ||
      json?.StateCode === 200 ||
      json?.stateCode === '00000000' ||
      json?.StateCode === '00000000')
  ) {
    return json
  }
  const err = new Error(json?.stateInfo || json?.StateInfo || '请求接口失败')
  err.response = res
  err.response.json = json
  throw err
}

export async function download({ method = 'GET', url, header = {}, query, body, filename }) {
  const res = await ajax({
    method,
    url,
    header,
    query,
    body,
  })
  if (res.status === 200) {
    const blob = await res.blob()
    FileSaver.saveAs(blob, filename)
    return
  }
  throw new Error(res.statusText || '请求接口失败')
}

export function addQueryToUrl(url, query) {
  if (url.indexOf('?') === -1) {
    url =
      url +
      qs.stringify(query, {
        addQueryPrefix: true,
      })
  } else {
    url =
      url +
      '&' +
      qs.stringify(query, {
        addQueryPrefix: false,
      })
  }
  return url
}

export default {
  install: Vue => {
    Vue.prototype.$request = request
    Vue.prototype.$download = download
  },
}
