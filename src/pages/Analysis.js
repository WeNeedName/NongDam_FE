import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// 이미지
import Profile from "../images/Profile.png";

// 컴포넌트
import Header from "../components/Header";
import Sales from "../components/analysis/Sales";
import TotalHarvest from "../components/analysis/TotalHarvest";
import AccountAnalysis from "../components/analysis/AcountAnalysis";
import Income from "../components/analysis/Income";
import Expense from "../components/analysis/Expense";
import WorkTime from "../components/analysis/WorkTime";

const Analysis = () => {
  const navigate = useNavigate();
  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  return (
    <>
      <Wrap>
        <Header currentPage="analysis" />
        <Sales />
        <TotalHarvest />
        <AccountAnalysis />
        <WorkTime />
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
