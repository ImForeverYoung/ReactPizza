import logo from './logo.svg';
// import './App.css';
import './scss/app.scss'
import React, {Suspense} from "react";
import Header from './components/Header'
import axios from 'axios'
import Categories from './components/Categories';
import { useSelector, useDispatch } from 'react-redux'
//import { decrement, increment } from './redux/slices/filterSlice'
import Sort from './components/Sort';

import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';
//import Cart from './pages/Cart';
import Home from './pages/Home'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import MainLayout from './layouts/MainLayout';

const Cart = React.lazy(()=> import(/* webpackChunkName: "Cart" */"./pages/Cart"));
const PizzaInfo = React.lazy(()=>import(/* webpackChunkName: "PizzaInfo" */"./pages/PizzaInfo"));
function App() {
  //const [searchValue, setSearchValue] = React.useState('');


  
  
  return (

    
      
      <div className="content">
        
      
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="" element={<Home  />} />
              <Route 
                path="/cart" 
                element={
                  <Suspense fallback={<div style={{height: "800px"}}>Cart is Loading...</div>}>
                    <Cart />  
                  </Suspense>
                } 
              />
              <Route path="/pizza/:id" element={
                <Suspense fallback={<div style={{height: "620px"}}></div>}>
                  <PizzaInfo />

                </Suspense>
              } />
              <Route path="*" element={null} />
            </Route>
            
          </Routes>
        
      </div>
      
    
  );
}

export default App;
