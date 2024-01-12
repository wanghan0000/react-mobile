import React from 'react';
import './index.less';
import { IconClose } from '@arco-design/mobile-react/esm/icon';
import logoPath from '@/assets/main/home/app-logo.png'
import { Button } from '@arco-design/mobile-react';

const DownLoadBar = () => {
  return (
    <div className="wh-download-bar">
      <div className="inner">
        <IconClose className='btn-close'/>
        <div className='logo'>
            <img src={logoPath}></img>
        </div>
        <div className='content-text'>
            <span className='text-1'>快乐APP</span>
            <span className='text-2'>双倍快乐，尽在掌握</span>
        </div>
        <Button
                className='btn-down-load'
                inline
                type="default"
                bgColor="linear-gradient(278.7deg, #0578FF 5.08%, #15D5FF 108.09%)"
                color="white"
                shape="round"
                size="small"
            >download</Button>
      </div>
    </div>
  );
};

export default DownLoadBar;
