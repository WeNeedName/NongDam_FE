import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import Sales from "../components/analysis/Sales";
import TotalHarvest from "../components/analysis/TotalHarvest";
import Income from "../components/analysis/Income";
import Expense from "../components/analysis/Expense";
import WorkTime from "../components/analysis/WorkTime";

const Analysis = () => {
  return (
    <>
      <Header />
      <Title>내 농장 현황 👀</Title>
      <Wrap>
        <Sales />
        <TotalHarvest />
      </Wrap>
      <Title>올 해는 이렇게 관리했어요 💸</Title>
      <Wrap>
        <Income />
        <Expense />
      </Wrap>
      <Title>작년에 비해 작업시간이 20% 감소했어요 🚀</Title>
      <WorkTime />
    </>
  );
};

const Title = styled.h2`
  margin-left: 30px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  flex-wrap: wrap;
`;

export default Analysis;
