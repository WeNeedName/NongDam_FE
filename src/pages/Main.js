import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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
import FooterNav from "../components/FooterNav";
import Footer from "../components/Footer";

// 이미지
import QuestionMark from "../images/QuestionMark.png";
import ExclamationMark from "../images/ExclamationMark.png";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [salesCategory, setSalesCategory] = useState("month");
  const [harvestCaterory, setHarvestCaterory] = useState("month");
  const [isHovering, setIsHovering] = useState(false);

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
  }, [dispatch]);

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
          workTimeData={workTimeData}
        />
        <TodayNews />

        <Icon
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          Image={QuestionMark}
          chickenIcon={ExclamationMark}
          onClick={() => {
            const openNewWindow = window.open("about:blank");
            openNewWindow.location.href =
              "https://www.notion.so/68b8a2b03fc64ce18c36e90658786d8d";
          }}
        />
        {isHovering ? (
          <Info>
            <Emoji>🧑‍🌾</Emoji> 농담이 처음이신가요?
          </Info>
        ) : null}
        <Footer />
        <FooterNav currentPage="main" />
      </Wrap>
    </>
  );
};

const boxFade = keyframes`
  0% {
    transform: scale(1, 1);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  }
  100% {
    transform: scale(1.2, 1.2);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  }
`;

const boxFadeB = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrap = styled.div`
  width: 100vw;
  max-width: 1920px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 1fr repeat(3, 25%) 1fr;
  grid-template-rows: 80px repeat(6, 110px);
  justify-content: center;
  flex-flow: wrap;
  row-gap: 16px;
  column-gap: 20px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, 27.5%) 1fr;
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    grid-template-columns: 1fr 90% 1fr;
    grid-template-rows: 80px repeat(12, auto) 50px;
  }
`;

const Info = styled.div`
  width: 220px;
  height: 60px;
  border-radius: 8px;
  position: absolute;
  position: fixed;
  right: 190px;
  bottom: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: ${boxFadeB} 1s;
  z-index: 1000;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    bottom: 120px;
    right: 150px;
  }
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.Image});
  background-position: center 30%;
  background-size: cover;
  position: fixed;
  bottom: 90px;
  right: 70px;
  z-index: 110;
  border-radius: 100px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  &:hover {
    animation: ${boxFade} 2s;
    background-image: url(${(props) => props.chickenIcon});
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-right: 4px;
`;

export default Main;
