import React from "react";
import { Button } from '@arco-design/mobile-react';
import { useNavigate } from "react-router";

////// 123
const Home = ()=>{
    const navigate = useNavigate()
    const handleOnclick=()=>{
        navigate('/user')
    }
    return (<div>Home
        <Button needActive onClick={handleOnclick}>
            跳转Login
        </Button>
    </div>)
}
//
export default Home