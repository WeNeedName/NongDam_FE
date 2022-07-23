import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

//컴포넌트
import Income from "./Income";
import Expense from "./Expense";

const AccountAnalysis = ({ incomeData, expenseData }) => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <TitleWrap>
        <SmileIcon>😀</SmileIcon>
        <Title>
          올 한해는 <br />
          이렇게 관리했어요
        </Title>
        <div></div>
      </TitleWrap>
      {incomeData?.data.length !== 0 && expenseData?.data.length !== 0 ? (
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
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
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

export default AccountAnalysis;
