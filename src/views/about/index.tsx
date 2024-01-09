import React from "react";
import { Outlet, useNavigate } from "react-router";

const About = ()=>{
    const navigate = useNavigate()
    return (<div>
        About
        <button onClick={()=>{
            navigate('/about/child')
        }}>BTN-CHILD</button>
        <Outlet />
    </div>)
}

export default About