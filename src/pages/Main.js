import React from "react";
import styled from "styled-components";

// 컴포넌트
import Header from "../components/Header";
import Weather from "../components/main/Weather";
import MarketPriceCard from "../components/main/MarketPriceCard";
import TodayTodo from "../components/main/TodayTodo";
import SalesCard from "../components/main/SalesCard";
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
        <SalesCard />
        <TodayNews />
        <TodayPost />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  max-width: 1920px;
  height: 100vh;
  background: #f5f5f5;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 24% 24% 24% 1fr;
  grid-template-rows: 0.6fr 1fr 1fr 1fr 1fr 1fr 0;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 26px;
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
    grid-template-rows: 60px 140px 140px 140px 140px 140px 140px 140px 140px 0px;
  }
`;

export default Main;
