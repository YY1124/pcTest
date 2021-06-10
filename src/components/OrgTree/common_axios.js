import Axios from 'axios'
import qs from 'qs'

const axios = Axios.create()
axios.defaults.timeout = 60000
axios.get = (
	url, {
		params = {}
	} = {
		...params,
	}
) => {
	return axios({
		method: 'get',
		url: url +
			`?${qs.stringify(params, {
        arrayFormat: 'repeat',
      })}`,
	})
}
axios.post = (url, data = {}, options) => {
	return axios({
		method: 'post',
		url: url,
		data: qs.stringify(data, {
			arrayFormat: 'repeat',
		}),
		...options,
	})
}

axios.postJson = (url, data = {}, options) => {
	return axios({
		headers: {
			'Content-Type': 'application/json'
		},
		method: 'post',
		url: url,
		data: data,
		...options,
	})
}

//请求数据拦截处理  可在里面添加逻辑，暂时直接返回
axios.interceptors.request.use(
	config => {
		return config
	},
	err => {
		return err.response
	}
)

//返回数据拦截处理 可在里面添加逻辑，暂时直接返回
axios.interceptors.response.use(
	res => {
		return res
	},
	err => {
		return err.response
	}
)

export default axios
