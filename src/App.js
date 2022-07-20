import React, { useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//컴포넌트
import Main from "./pages/Main";
import Analysis from "./pages/Analysis";
import AccountBook from "./pages/AccountBook";
import MarketPrice from "./pages/MarketPrice";
import AccountWrite from "./components/accountbook/AccountWrite";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";
import OauthFilter from "./pages/OauthFilter";
import Schedule from "./pages/Schedule";
// import AddSchedule from "./components/schedule/AddSchedule";
import WorkLog from "./pages/WorkLog";
import WirteWorkLog from "./pages/WriteWorkLog";
import DetailWorkLog from "./pages/DetailWorkLog";

function App() {
  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

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
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/worklog/" element={<WorkLog />} />
        <Route path="/worklog/detail/:id" element={<DetailWorkLog />} />
        <Route path="/WriteWorkLog" element={<WirteWorkLog />} />
        <Route path="/schedule" element={<Schedule />} />
        {/* <Route path="/addSchedule" element={<AddSchedule />} /> */}
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
    font-size: 85%;
    background: #f5f5f5;
    ::-webkit-scrollbar {
    display: none;
  }
  }
`;

export default App;
