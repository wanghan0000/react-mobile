import React, { useEffect } from 'react';
import AutomaticGeneratedRoutes from './router/index'
import { Navigate, Route, Routes } from 'react-router';
import LazyCompoment from './compoments/lazyCompoment/LazyCompoment';
import './App.less'
function App() {
  console.log(AutomaticGeneratedRoutes)
  return (
    <div className="App">
      <Routes>
        {
          AutomaticGeneratedRoutes.map((v: any, index: number) => {
            return <Route
              key={index}
              path={v.path}
              element={
                <LazyCompoment component={v.component} ></LazyCompoment>
              }
            >
              {
                v?.children?.map((v: any, index: number) => {
                  return <Route
                    key={index}
                    path={v.path}
                    element={
                      <LazyCompoment component={v.component} ></LazyCompoment>
                    }
                  >
                  </Route>
                })
              }
              {
                // 设置默认子路由
                v?.defaultRoute && <Route index element={<Navigate replace to={v?.defaultRoute}></Navigate>} />
              }

            </Route>
          })
        }
        <Route path={'*'} element={<Navigate to="/main"></Navigate>}></Route>
      </Routes>

    </div>
  );
}

export default App;
