import React from "react";
import { Outlet } from "react-router";
import TabBarBottom from './compoments/tabbar'
import './index.less'

const Main = () => {
    return (<div className="main-page">
        <div className="content">
            <Outlet />
        </div>
        <TabBarBottom className="bottom-tabbar"/>
    </div>)
}


export default Main