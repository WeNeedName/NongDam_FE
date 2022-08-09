import React, { useEffect } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./App.css";
import RouteChangeTracker from "./RouteChangeTracker";

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
import theme from "./theme";
import WorkLog from "./pages/WorkLog";
import WirteWorkLog from "./pages/WriteWorkLog";
import DetailWorkLog from "./pages/DetailWorkLog";
import NotFound from "./components/NotFound";

function App() {
  const navigate = useNavigate();
  RouteChangeTracker();
  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
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
          <Route path="/code/auth" element={<OauthFilter />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: "Noto Sans KR", sans-serif;
    color:  #02113B;
    margin: 0;
    padding: 0;
    font-size: 85%;
    background: ${({ theme }) => theme.colors.BackgroundColor};
    ::-webkit-scrollbar {
    display: none;
  }
  }
`;

export default App;
