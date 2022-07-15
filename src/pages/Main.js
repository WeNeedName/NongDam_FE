import React from "react";
import styled from "styled-components";

// 컴포넌트
import Header from "../components/Header";
import Weather from "../components/main/Weather";
import MarketPriceCard from "../components/main/TodayMarketPriceCard";
import TodayTodo from "../components/main/TodayTodo";
import AnalysisCard from "../components/main/AnalysisCard";
import TodayNews from "../components/main/TodayNews";
import TodayPost from "../components/main/TodayPost";

const Main = () => {
  return (
    <>
      <Wrap>
        <Header currentPage="main" />
        <Weather />
        <MarketPriceCard />
        <TodayTodo />
        <AnalysisCard />
        <TodayNews />
        {/* <TodayPost /> */}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  max-width: 1920px;
  height: auto;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr repeat(3, 28%) 1fr;
  grid-template-rows: 80px repeat(7, 13%) 0;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 20px;
  margin-bottom: 30px;
  /* @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 28%) 1fr;
  } */
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
    grid-template-rows: 70px repeat(12, auto) 0px;
  }
`;

export default Main;
