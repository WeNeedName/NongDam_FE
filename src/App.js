import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";

//js파일
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <>
      <GlobalStyle />
      <div>App파일입니다!</div>;
      <Routes>
      <Route path = "/login" element ={<Login />} />
      <Route path = "/signup" element ={<Signup />} />
      </Routes>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: "Noto Sans KR", "Apple SD Gothic Neo", "맑은 고딕",
    "Malgun Gothic", sans-serif;
    color: #424242;
    margin: 0;
    padding: 0;
  }
`;

export default App;
