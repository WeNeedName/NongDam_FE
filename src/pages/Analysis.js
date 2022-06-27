import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import Sales from "../components/analysis/Sales";
import TotalHarvest from "../components/analysis/TotalHarvest";

const Analysis = () => {
  return (
    <div>
      <Header />
      <h3>내 농장 현황</h3>
      <Sales />
      <TotalHarvest />
    </div>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

export default Analysis;
