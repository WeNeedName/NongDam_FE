import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// 컴포넌트
import Header from "../components/Header";
import Weather from "../components/main/Weather";
import MarketPriceCard from "../components/main/TodayMarketPriceCard";
import TodayTodo from "../components/main/TodayTodo";
import AnalysisCard from "../components/main/AnalysisCard";
import TodayNews from "../components/main/TodayNews";

const Main = () => {
  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  return (
    <>
      <Wrap>
        <Header currentPage="main" />
        <Weather />
        <MarketPriceCard />
        <TodayTodo />
        <AnalysisCard />
        <TodayNews />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  /* height: 100vh; */
  max-width: 1920px;
  /* height: auto; */
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr repeat(3, 25%) 1fr;
  grid-template-rows: 80px repeat(7, 110px) 0;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 20px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 27.5%) 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
    grid-template-rows: 70px repeat(12, auto) 0px;
  }
`;

export default Main;
