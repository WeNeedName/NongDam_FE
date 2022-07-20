import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getIncomeDB,
  getExpenseDB,
  getWorktimeDB,
  getSalesDB,
  getTotalHarvestDB,
} from "../redux/modules/analysis";

// 컴포넌트
import Header from "../components/Header";
import Sales from "../components/analysis/Sales";
import TotalHarvest from "../components/analysis/TotalHarvest";
import AccountAnalysis from "../components/analysis/AcountAnalysis";
import Income from "../components/analysis/Expense";
import Expense from "../components/analysis/Income";
import WorkTime from "../components/analysis/WorkTime";

const Analysis = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = sessionStorage.getItem("jwtToken");
  const incomeData = useSelector((state) => state.analysis.income);
  const expenseData = useSelector((state) => state.analysis.expense);
  const workTimeData = useSelector((state) => state.analysis.worktime);
  const salesData = useSelector((state) => state.analysis.sales);
  const totalHarvestData = useSelector((state) => state.analysis.totalharvest);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  useEffect(() => {
    dispatch(getIncomeDB());
    dispatch(getExpenseDB());
    dispatch(getWorktimeDB());
    dispatch(getSalesDB());
    dispatch(getTotalHarvestDB());
  }, [dispatch]);

  return (
    <>
      <Wrap>
        <Header currentPage="analysis" />
        <Sales salesData={salesData} />
        <TotalHarvest totalHarvestData={totalHarvestData} />
        <AccountAnalysis incomeData={incomeData} expenseData={expenseData} />
        <WorkTime workTimeData={workTimeData} />
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  height: auto;
  width: 100vw;
  max-width: 1920px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr repeat(8, 8.8%) 1fr;
  grid-template-rows: 90px 360px 360px 0;
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 16px;
  background: #f5f5f5;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(8, 7.8%) 1fr;
    grid-template-rows: 90px 320px 320px 0;
  }
`;

const BodyWrap = styled.h2`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export default Analysis;
