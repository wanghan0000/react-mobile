import React from "react";
import { Button } from '@arco-design/mobile-react';
import { useNavigate } from "react-router";
import { store } from '@/store/game';
import { useStore } from "resy";
import Game from "../game";
////// 123
const Home = ()=>{
    const navigate = useNavigate()
    const handleOnclick=()=>{
        navigate('/user')
    }
    const { count } = useStore(store);
    return (<div>Home
        <Button needActive onClick={handleOnclick}>
            跳转Login
        </Button>
        <div>{store.count}</div>
        <button onClick={() => store.count++}>+count</button>
        <Game />
    </div>)
}
//
export default Home