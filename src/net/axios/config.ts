import { ERROR_CODE } from "./errorCode";
import { AxiosTypes, ResponseTypes } from "./index.inter";

/**
 * 添加公共header
 * @returns
 */
export const onDynamicHeader = () => {
  const token = '';
  const headers = {};
  return headers;
};
/**
 * 配置
 */
export const config = {
  domainName: process.env.REACT_APP_MAIN_API,
  timeout: 15000,
};
/**加密 */
export const getApiSign = (params:any)=>{
    return params || {}
}

export const onHandleResponseData = <T>(response: AxiosTypes<ResponseTypes<T>>) => {
    return new Promise<any>((resolve, reject) => {
      const data = response.data;
      if (data.code != '200') {
        if (data.code) {
          const errorCode = data.code;
          data.code = dealDataErrorCode(data.code);
          reject({ ...data, errorCode });
        } else {
          reject({ code: 'ERROR_DATA' });
        }
      } else {
        resolve(data.data === null || data.data === undefined ? {} : data.data);
      }
    });
  };
  const dealDataErrorCode = (code: string) => {
    if (ERROR_CODE.includes(`ERROR_${code}`)) {
      return `ERROR_${code}`;
    } else {
      return 'ERROR_999';
    }
  };
  
