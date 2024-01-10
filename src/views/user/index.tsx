import React from "react";
import { Outlet } from "react-router";
// import './index.less'

const User = () => {
    return (<div className="user-page">
        <div className="content">
           
user路径
            <Outlet />
        </div>
        
    </div>)
}


export default User