import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

// 이미지
import Profile from "../images/Profile.png";

// js파일
import Header from "../components/Header";
import Weather from "../components/main/Weather";
import MarketPriceCard from "../components/main/MarketPriceCard";
import TodayTodo from "../components/main/TodayTodo";
import SalesCard from "../components/main/SalesCard";


const Main = () => {
  return (
    <div>
      <Header />
      <Weather />
      <MarketPriceCard />
      <TodayTodo />
      <SalesCard />
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

const Menu = styled.span`
  margin-right: 10px;
`;

const UserProfile = styled.img`
  width: 40px;
`;

export default Main;
