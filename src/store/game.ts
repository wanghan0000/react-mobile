import { useStore } from './base/useStore';

export const useStoreCount = (defaultValue?: number):[number, (data: number) => void] => {
  return useStore<number>('storeCount', defaultValue);
};
