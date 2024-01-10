import { fetcher } from "@/net/axios"
import SWRKey from "@/net/swr";
import useSWR from 'swr';
export const useGetData = () =>  {
    const fetch = ()=>{
        return fetcher({
            path:'/api/items',
            type: 'get',
            baseURL: 'http://localhost:8080/'
        },{}).then((res:any)=>{
            //修改数据再返回
            res.sort((a:any,b:any)=>{
                return b.id - a.id
            })
            return res;
        })
    }

    return useSWR(SWRKey.keyPrefix,fetch,{
        //数据缓存60s
        dedupingInterval: 60 * 1000
    })

}