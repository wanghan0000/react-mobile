/**
 * axios封装
 */
import qs from 'qs'
import axios, { Axios, AxiosResponse } from 'axios'
import {
  URLInterface, RequestMethodProps, AxiosProps, RequestConfigProps,
  HandleRequestResponse, DomainAryProps, ServiceConfigProps,
  ResponseTypes,
  AxiosTypes,
} from './index.inter'
import { config, getApiSign, onDynamicHeader, onHandleResponseData } from './config'



/** 响应错误的处理逻辑 */
const onRejected = (error: any) => {
  const { message, response } = error
  const err = { code: response ? response.status : 0, message }
  if (response) {
    const { status, data }: AxiosResponse = response
    switch (status) {
      case 400: err.message = `${status} 请求参数有误`; break
      case 401: err.message = `${status} 当前请求需要用户验证`; break
      case 403: err.message = `${status} 服务器已经理解请求，但是拒绝执行它`; break
      case 404: err.message = `${status} 请求路径不存在`; break
      case 405: err.message = `${status} 请求行中指定的请求方法不能被用于请求相应的资源`; break
      case 500: err.message = `${status} 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理`; break
      case 502: err.message = `${status} 网关错误！`; break
      case 503: err.message = `${status} 由于临时的服务器维护或者过载，服务器当前无法处理请求。`; break
      case 504: err.message = `${status} 响应超时`; break
      case 505: err.message = `${status}  HTTP版本不受支持！`; break
      default: err.message = `${status} ${data?.message || message}`; break
    }
  }
  if (message.includes('timeout')) {
    err.message = '网络请求超时！'
    err.code = 504
  }
  if (message.includes('Network')) {
    err.message = window.navigator.onLine ? '网络未连接' : '网络错误'
    err.code = -7
  }
  if (axios.isCancel(error)) { // 取消了重复请求
    return Promise.reject( { code :"000" })
  } else {
    return Promise.reject( { code :"ERROR_NETWORK" })
  }
}

/**
 * 根据请求路径返回基础域名和请求头等
 * @param {URLInterface}       url    请求接口
 * @param {RequestConfigProps} config 请求配置
 * @returns {HandleRequestResponse}
 */
const handleRequest = (url: URLInterface, config?: RequestConfigProps):HandleRequestResponse => {
  if (config) {
    const { domainAry, domainName, headers }:RequestConfigProps = config
    // 请求的域名
    let domain: string | undefined
    let header: any
    let timeout: number | undefined
    if (domainAry) {
      for (let index = 0; index < domainAry.length; index++) {
        const dm: DomainAryProps = domainAry[index]
        if (!dm.serviceName) {
          continue
        } else {
          const service: string | ServiceConfigProps | undefined = dm.serviceName.find((sn: string | ServiceConfigProps) => {
            return typeof sn === 'string' ? url.path.includes(sn) : url.path.includes(sn.name)
          })
          if (service) {
            if (typeof service === 'string') {
              header = dm.headers
              domain = dm.domainName
              timeout = dm.timeout
            } else {
              header = service.header || dm.headers
              domain = dm.domainName
              timeout = service.timeout || dm.timeout
            }
            break
          }
        }
      }
    }
    return {
      baseURL: domain || domainName,
      header: header || headers,
      timeout
    }
  }
  return {}
}

/** 初始化项目 */
class BaseAxios {
  constructor (config?:AxiosProps) {
    this.closeCancelRequest = config?.closeCancelRequest // 默认是不关闭自动取消重复请求
    this.requestConfig = config?.requestConfig // 请求的配置
    this.timeout = config?.timeout // 请求超时时间
    this.config = config
    this.instance = axios.create()
    // 注册请求和响应的拦截器
    this.initInterceptors()
  }

  /** 请求的配置 */
  private config?: AxiosProps

  /** 请求的配置 */
  private requestConfig?: RequestConfigProps

  /** 请求超时的时间 */
  private timeout?: number

  /** 是否关闭取消重复 */
  private closeCancelRequest?: boolean

  /** 新的请求实例 */
  private instance: Axios


  /** 初始化：注册拦截器 */
  private initInterceptors () {
    this.instance.interceptors.request.use((config: RequestMethodProps) => {
      return config
    })
    this.instance.interceptors.response.use((response: any) => {
      return response
    }, (error) => {
      return onRejected(error)
    })
  }


  /**
   * 发送请求
   * @param {URLInterface} url 接口
   * @param {*} params 参数
   * @param {RequestMethodProps} config 其余配置
   * @returns {Promise<any>}
   */
  request = <T>(url: any, inParams: any = {
    placeholderLang: ""
  }, config: RequestMethodProps = {}) : Promise<T> => {

    url = url as URLInterface
    const { path, type = 'get' ,baseURL: methodBaseURL } = url
    const { onDynamicHeader, onHandleResponseData }:AxiosProps = this.config || {}
    const { headers = {}, timeout: methodTimeout, mergeHeader = true, ...methodConfig } = config
    const { header = {}, baseURL, timeout }:HandleRequestResponse = handleRequest(url, this.requestConfig)
    const dynamicHeader = onDynamicHeader ? onDynamicHeader() : {}
    const baseConfig = {
      baseURL: methodBaseURL || baseURL,
      headers: mergeHeader ? { ...dynamicHeader, ...header,  ...headers } : ({ ...dynamicHeader, ...(headers || header) }),
      timeout: methodTimeout || timeout || this.timeout
    }
    if(/(post|POST)/.test(type) && this.config?.handleSign){
      inParams =  this.config.handleSign(inParams)
    }
    // 发送请求
    const instanceResponse : Promise<AxiosTypes<ResponseTypes<T>>> = this.instance.request({
      url: path,
      method: type,
      data: /(post|POST)/.test(type) ? inParams : undefined, // post请求方式
      params: /(get|GET)/.test(type) ? inParams : undefined, // get 请求方式
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      ...baseConfig,
      ...methodConfig
    })
    if (onHandleResponseData) {
      return new Promise((resolve, reject) => {
        instanceResponse.then((response) => {
          response.requestData = inParams
          onHandleResponseData(response, config, this)
          .then((res: any) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
        }).catch((err) => {
          reject(err)
        })
      })
    } else {
      return new Promise<T>((resolve, reject) => {
        instanceResponse.then(res => {
          const data = res.data;
          resolve(data.data);
        }).catch(error => {
          //let e = JSON.stringify(error);
          reject( { code :"ERROR_NETWORK" })
        })
      })
    }
  }
}


const AxiosExpand = new BaseAxios({
  requestConfig: config,
  onDynamicHeader: onDynamicHeader,
  onHandleResponseData: onHandleResponseData,
  handleSign: getApiSign
})

export interface APIConfig {
  path: string;
  type?: string;
  /**表单 */
  formData?: boolean;
  baseURL?: string;
}

export const fetcher = <T>(config: APIConfig, params: any): Promise<T> => {
  const { formData = false } = config;
  if(formData) {
    params = new URLSearchParams(qs.stringify(params));
  }
  return AxiosExpand.request<T | any>(config, params).then((res)=>{
    return res;
  })
}

export default AxiosExpand;