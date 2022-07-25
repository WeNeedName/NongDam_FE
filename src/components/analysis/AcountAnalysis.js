import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

// 로딩 효과
import { ShimmerCircularImage } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";

//컴포넌트
import Income from "./Income";
import Expense from "./Expense";

const AccountAnalysis = ({ incomeData, expenseData }) => {
  const navigate = useNavigate();
  const income_is_loaded = useSelector(
    (state) => state.analysis.income_is_loaded
  );
  const expense_is_loaded = useSelector(
    (state) => state.analysis.expense_is_loaded
  );

  return (
    <Wrap>
      <TitleWrap>
        <SmileIcon>😀</SmileIcon>
        <Title>
          올 한해는 <br />
          이렇게 관리했어요
        </Title>
      </TitleWrap>
      {income_is_loaded && expense_is_loaded ? (
        incomeData?.data !== undefined &&
        expenseData?.data !== undefined &&
        incomeData?.data.length !== 0 &&
        expenseData?.data.length !== 0 ? (
          <>
            <BodyWrap>
              <Income incomeData={incomeData} />
              <Expense expenseData={expenseData} />
            </BodyWrap>
          </>
        ) : (
          <NoticeWrap>
            <NoticeT>
              지금 농장장부를 기록하고
              <br />
              수입 및 지출을 알아보세요!
            </NoticeT>
            <NoticeBtn
              onClick={() => {
                navigate("/accountbook");
              }}
            >
              기록하러 가기
            </NoticeBtn>
          </NoticeWrap>
        )
      ) : (
        <BodyWrap>
          <CircleWrap>
            <Circle>
              <ShimmerCircularImage size={170} /> <InlineCircle />
            </Circle>
            <ShimmerText
              className="thumNail-text"
              line={3}
              gap={10}
              variant="secondary"
            />
          </CircleWrap>
          <CircleWrap>
            <Circle>
              <ShimmerCircularImage size={170} /> <InlineCircle />
            </Circle>
            <ShimmerText
              className="thumNail-text"
              line={3}
              gap={10}
              variant="secondary"
            />
          </CircleWrap>
        </BodyWrap>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  grid-column: 2 / 7;
  grid-row: 2 / 3;

  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(10%);
 
  }
  30% {
    opacity: 0.3;
    transform: translateY(6%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  animation: ${boxFade} 1s;
`;

const SmileIcon = styled.span`
  font-size: 24px;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
  margin-left: 10px;
  text-align: left;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 20px;
  }
`;

const NoticeWrap = styled.div`
  width: 100%;
  height: 76%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%,
    transparent 100%
  );
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 10px;
`;

const NoticeT = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
`;

const NoticeBtn = styled.button`
  padding: 8px 18px;
  margin-top: 4px;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  color: #1aacff;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const CircleWrap = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 760px) {
    margin-top: 20px;
  }
`;

const Circle = styled.div`
  position: relative;
`;

const InlineCircle = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  border-radius: 100%;
  top: 35px;
  left: 35px;
`;

export default AccountAnalysis;
