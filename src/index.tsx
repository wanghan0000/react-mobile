import React from 'react';
import setRootPixel from '@arco-design/mobile-react/tools/flexible';
import Arco, { ContextProvider } from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/style';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SWRConfig } from 'swr';

//  123456

/**
 * @param baseFontSize 1rem基准fontSize，默认 50
 * @param sketchWidth UI稿宽度，默认 375
 * @param maxFontSize 最大fontSize限制， 默认 64
 * @return {Function} removeRootPixel 取消baseFontSize设置并移除resize监听，类型为 () => void
 */
setRootPixel(37.5);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
   <ContextProvider isDarkMode={true} darkModeSelector="arco-theme-dark">
   <SWRConfig
      value={{
        //数据缓存有效期 默认不缓存
        dedupingInterval: 0,
        //错误后自动请求间隔
        errorRetryInterval: 3000,
        //错误后自动重试次数
        errorRetryCount: 3,
        //页面重新激活后是否重新请求
        revalidateOnFocus: false,
      }}
    >
      <App />
    </SWRConfig>
   </ContextProvider>

  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals