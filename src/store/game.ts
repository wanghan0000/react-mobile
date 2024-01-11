import { useStore } from "react-hook-simple-state";


export const useStoreCount = (defaultValue?: number):[number, (data: number) => void] => {
  return useStore<number>('storeCount', defaultValue);
};
