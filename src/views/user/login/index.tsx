import React from "react";
import { Button } from '@arco-design/mobile-react';
import { useNavigate } from "react-router";

const Login = ()=>{
    const navigate = useNavigate()
    const handleOnclick=()=>{
        navigate('/main/home')
    }
    return (<div>
login页面
        <Button needActive onClick={handleOnclick}>
            跳转Home
        </Button>
    </div>)
}

export default Login