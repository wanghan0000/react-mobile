import React from 'react';
import { useGetData } from './api';
import { useStore } from "resy";
import { store } from '@/store/game';

const Game = () => {
  const { data, isLoading, error, mutate } = useGetData();
  const { count } = useStore(store);
  return (
    <div>
      <div>Game</div>

      {isLoading ? <div>Loading...</div> : <div style={{fontSize: 16}}>{JSON.stringify(data)}</div>}
      {/* {!!error && <div>{error}</div>} */}
      {count}
    </div>
  );
};

export default Game;
