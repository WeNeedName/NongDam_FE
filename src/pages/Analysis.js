import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
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
import FooterNav from "../components/FooterNav";
import Footer from "../components/Footer";

// 이미지
import QuestionMark from "../images/QuestionMark.png";
import ExclamationMark from "../images/ExclamationMark.png";
import WIPIcon from "../images/WIPIcon.png";

const Analysis = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [harvestCaterory, setHarvestCaterory] = useState("month");
  const [salesCategory, setSalesCategory] = useState("month");
  const [isHovering, setIsHovering] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

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
    dispatch(getTotalHarvestDB(harvestCaterory));
  }, [harvestCaterory]);

  useEffect(() => {
    dispatch(getSalesDB(salesCategory));
  }, [salesCategory]);

  // 윈도우 사이즈 추적
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <>
      <Header currentPage="analysis" />
      {windowSize.innerWidth > 760 ? (
        <Wrap>
          <AccountAnalysis incomeData={incomeData} expenseData={expenseData} />
          <WorkTime workTimeData={workTimeData} />
          <TotalHarvest
            totalHarvestData={totalHarvestData}
            setHarvestCaterory={setHarvestCaterory}
            harvestCaterory={harvestCaterory}
          />
          <Sales
            salesData={salesData}
            setSalesCategory={setSalesCategory}
            salesCategory={salesCategory}
          />
          <Icon
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            Image={QuestionMark}
            chickenIcon={ExclamationMark}
            onClick={() => {
              const openNewWindow = window.open("about:blank");
              openNewWindow.location.href =
                "https://docs.google.com/forms/d/e/1FAIpQLSfdZk0LhMOcp8FVaChB2mvIvixRKmY4A_iErl-UsoI0qPJVLg/viewform?usp=sf_link";
            }}
          />
          {isHovering ? (
            <Info>
              <Emoji>🧑‍🌾</Emoji> 농담이 처음이신가요?
            </Info>
          ) : null}
        </Wrap>
      ) : (
        <IconWrap>
          <WIPIconS src={WIPIcon} alt="준비 중 아이콘" />
          <InfoT>농장 현황은 웹에서 확인하실 수 있습니다</InfoT>
          <InfoT2>모바일은 준비 중이니 조금만 기다려주세요!</InfoT2>
        </IconWrap>
      )}
      <FooterNav currentPage="analysis" />
      <Footer currentpage="schedule" />
    </>
  );
};

const boxFadeB = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const boxFadeC = keyframes`
  0% {
    transform: scale(1, 1);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  }
  100% {
    transform: scale(1.2, 1.2);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  }
`;

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
  margin-bottom: 20px;
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
    grid-template-rows: 80px repeat(6, auto) 0px;
    margin-bottom: 70px;
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
  @media only screen and (max-width: 760px) {
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
    animation: ${boxFadeC} 2s;
    background-image: url(${(props) => props.chickenIcon});
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 4px;
`;

const IconWrap = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const WIPIconS = styled.img`
  width: 110px;
  margin-bottom: 30px;
`;

const InfoT = styled.span`
  font-size: 14px;
  color: #a3a3a3;
  font-weight: 500;
  margin: 1px 0px;
`;

const InfoT2 = styled.span`
  font-size: 14px;
  color: #a3a3a3;
  font-weight: 400;
  margin: 1px 0px;
`;

export default Analysis;
