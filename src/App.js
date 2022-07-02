import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";

//js파일

import Main from "./pages/Main";
import Analysis from "./pages/Analysis";
import AccountBook from "./pages/AccountBook";
import MarketPrice from "./pages/MarketPrice";
import AccountWrite from "./components/accountbook/AccountWrite";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditMemberInfo from "./pages/EditMemberInfo";
import EditPw from "./pages/EditPw";

import MyPage from "./pages/MyPage";
import OauthFilter from "./pages/OauthFilter";
import Schedule from "./pages/Schedule";
import AddSchedule from "./components/schedule/AddSchedule";

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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editmemberinfo" element={<EditMemberInfo />} />
        <Route path="/editpw" element={<EditPw />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/addSchedule" element={<AddSchedule />} />
        <Route path="/code/auth" element={<OauthFilter />} />
      </Routes>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: "Noto Sans KR";
    color:  #02113B;
    margin: 0;
    padding: 0;
  }
`;

export default App;
