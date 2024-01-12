import React from 'react';
import { Button } from '@arco-design/mobile-react';
import { useNavigate } from 'react-router';
import Game from '../game';
import { useStoreCount } from '@/store/game';
import DownLoadBar from './compoment/downLoadBar';
import Banner from './compoment/banner';
////// 123
const Home = () => {
  const navigate = useNavigate();
  const handleOnclick = () => {
    navigate('/user');
  };
  const [count, setCount] = useStoreCount(1);
  return (
    <div>
      <DownLoadBar />
      <Banner></Banner>
      <Button needActive onClick={handleOnclick}>
        跳转Login
      </Button>
      {count}
      <Button onClick={() => setCount(count + 1)}>++count</Button>
      <Game />
    </div>
  );
};
//
export default Home;
