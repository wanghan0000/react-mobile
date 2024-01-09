import React from 'react';
import AutomaticGeneratedRoutes from './router/index'
import { Navigate, Route, Routes, useNavigate } from 'react-router';
import LazyCompoment from './compoments/lazyCompoment/LazyCompoment';
import './App.css'

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">

      <div className='title'>
        {
          AutomaticGeneratedRoutes.map((v:any, index:number) => {
            return (<div key={index} onClick={() => {
              navigate(v.path)
            }}>
              {v.name}
            </div>)
          })
        }
      </div>


      <Routes>
        {
          AutomaticGeneratedRoutes.map((v:any, index:number) => {
            return <Route
              key={index}
              path={v.path}
              element={
                <LazyCompoment component={v.component} ></LazyCompoment>
              }
            >
              {
                v?.children?.map((v:any,index:number)=>{
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
            </Route>
          })
        }
        <Route path={'*'} element={<Navigate to="/home"></Navigate>}></Route>
      </Routes>

    </div>
  );
}

export default App;
