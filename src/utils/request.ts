import Axios, { AxiosRequestConfig } from 'axios'
const Api = 'https://0e7b514f-9826-40f4-823c-5ba189a48675.mock.pstmn.io' // mock数据
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