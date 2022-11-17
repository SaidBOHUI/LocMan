// import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutNav from "./Components/layoutNav";
import {createGlobalStyle} from 'styled-components';
// import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  /* background: #2c3e50; */
      /* background-color: #A5292A; */
      /* background-color: #B8FAF0; , bleu clair*/
  font-family: 'Open Sans', 'sans-serif';
  overflow-x: hidden;
}`  


const App = () => {
  return (
    <>
    {/* <Suspense fallback = {<Loader />}> /} */}
    <GlobalStyle />
    <Router>
      <LayoutNav />
      {/* {/ <Header /> /} */}
        <Routes>
          {/* {/ <Route index element={<Home />} /> /} */}
          <Route path="user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
        </Routes>
      {/* {/ </LayoutNav> /}
      {/ <Footer /> /} */}
    </Router>
    {/* {/ </Suspense> */}
    </>
  );
}


export default App;