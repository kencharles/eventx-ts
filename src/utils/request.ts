import Axios, { AxiosRequestConfig } from 'axios'
const Api = 'https://b1264722-067f-47f8-9d37-d4fc9e4b7d46.mock.pstmn.io' // mock数据
// const Api = 'https://api.cryptonator.com/api/ticker/' // 真实API
const axios = Axios.create({
  // 你的配置
  baseURL:Api,
  timeout:30000
})

export async function request(url: string, config?: AxiosRequestConfig) {
  const response = await axios.request({ url, ...config })
  const result = response.data
  return result
}

export default axios