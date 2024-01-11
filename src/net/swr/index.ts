function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

class SWRKeyManager {
  private key = '';
  public static instance: SWRKeyManager;

  public get keyPrefix(): string {
    return this.key;
  }

  constructor(){
    this.randomKey()
  }

  public static init() {
    if(!SWRKeyManager.instance) {
        SWRKeyManager.instance = new SWRKeyManager()
    }
  }

  /**重新登录需要刷新key*/
  public randomKey() {
    this.key = 'swrKey' + generateRandomString(3) + generateRandomString(2);
  }
}
SWRKeyManager.init()
const SWRKey:SWRKeyManager  = SWRKeyManager.instance

export default SWRKey

/**
 * 
 * const useGetHome(params) {
 *      const fetch = ()=>{
 *         return fetcher({path:'xxx',type:'get'},{}).then((res)=>{
 *                  //处理数据
 *                  return res;
 *          })
 *      }
 *      return useSWR(SKRKey.keyPrefix + JSON.stringly(params),fetch,{})
 * }
 */