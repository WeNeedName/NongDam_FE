import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";

//js파일
import Main from "./pages/Main";
import Analysis from "./pages/Analysis";
import AccountBook from "./pages/AccountBook";
import MarketPrice from "./pages/MarketPrice";
import AccountWrite from "./components/accountbook/AccountWrite";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/accountbook" element={<AccountBook />} />
        <Route path="/accountwrite" element={<AccountWrite />} />
        <Route path="/marketprice" element={<MarketPrice />} />
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
