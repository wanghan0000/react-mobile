import React from 'react';
import setRootPixel from '@arco-design/mobile-react/tools/flexible';
import Arco from '@arco-design/mobile-react';
import '@arco-design/mobile-react/esm/style';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Metric } from 'web-vitals';
import { BrowserRouter } from 'react-router-dom';

/**
 * @param baseFontSize 1rem基准fontSize，默认 50
 * @param sketchWidth UI稿宽度，默认 375
 * @param maxFontSize 最大fontSize限制， 默认 64
 * @return {Function} removeRootPixel 取消baseFontSize设置并移除resize监听，类型为 () => void
 */
setRootPixel(37.5);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
   <App />
  </BrowserRouter>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals((metric: Metric)=>{
  console.log(metric)
});
