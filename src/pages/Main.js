import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getIncomeDB,
  getExpenseDB,
  getWorktimeDB,
  getSalesDB,
  getTotalHarvestDB,
} from "../redux/modules/analysis";

// 컴포넌트
import Header from "../components/Header";
import Weather from "../components/main/Weather";
import MarketPriceCard from "../components/main/TodayMarketPriceCard";
import TodayTodo from "../components/main/TodayTodo";
import AnalysisCard from "../components/main/AnalysisCard";
import TodayNews from "../components/main/TodayNews";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [salesCategory, setSalesCategory] = useState("month");
  const [harvestCaterory, setHarvestCaterory] = useState("month");

  const isLogin = sessionStorage.getItem("jwtToken");
  const incomeData = useSelector((state) => state.analysis.income);
  const expenseData = useSelector((state) => state.analysis.expense);
  const salesData = useSelector((state) => state.analysis.sales);
  const totalHarvestData = useSelector((state) => state.analysis.totalharvest);

  useEffect(() => {
    dispatch(getIncomeDB());
    dispatch(getExpenseDB());
    dispatch(getWorktimeDB());
  }, [dispatch]);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  useEffect(() => {
    dispatch(getSalesDB(salesCategory));
  }, [salesCategory]);

  useEffect(() => {
    dispatch(getTotalHarvestDB(harvestCaterory));
  }, [harvestCaterory]);

  return (
    <>
      <Wrap>
        <Header currentPage="main" />
        <Weather />
        <MarketPriceCard />
        <TodayTodo />
        <AnalysisCard
          salesData={salesData}
          totalHarvestData={totalHarvestData}
          incomeData={incomeData}
          expenseData={expenseData}
        />
        <TodayNews />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  width: 100vw;
  max-width: 1920px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr repeat(3, 25%) 1fr;
  grid-template-rows: 80px repeat(6, 110px) 0;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 20px;
  margin-bottom: 20px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 27.5%) 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
    grid-template-rows: 80px repeat(12, auto) 0px;
  }
`;

export default Main;
