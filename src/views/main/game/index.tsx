import React from 'react';
import { useGetData } from './api';

const Game = () => {
  const { data, isLoading, error, mutate } = useGetData();

  return (
    <div>
      <div>Game</div>

      {isLoading ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>}
      {/* {!!error && <div>{error}</div>} */}
    </div>
  );
};

export default Game;
