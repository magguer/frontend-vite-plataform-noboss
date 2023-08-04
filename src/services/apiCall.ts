import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
})

/* const responseBody = (response: AxiosResponse) => {
  if (response.data) return response.data
  else return response
} */

export type Headers = AxiosRequestConfig
export type Body = AxiosRequestConfig

export const apiCall = {
  get: (url: string) => instance.get(url)/* .then(responseBody) */,

  post: (url: string, body: Body, headers: Headers) =>
    instance.post(url, body, headers) /* .then(responseBody) */,
  
  put: (url: string, body: Body, headers: Headers) =>
    instance.put(url, body, headers)/* .then(responseBody) */,

  patch: (url: string, body: Body, headers: Headers) =>
    instance.patch(url, body, headers)/* .then(responseBody) */,

  delete: (url: string, headers: Headers) => instance.delete(url, headers)/* .then(responseBody) */,

}