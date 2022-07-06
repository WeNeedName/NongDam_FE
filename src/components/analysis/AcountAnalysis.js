import React, { useEffect, useState } from "react";
import styled from "styled-components";
//컴포넌트
import Expense from "./Expense";
import Income from "./Income";

const AccountAnalysis = () => {
  return (
    <IncomeWrap>
      <TitleWrap>
        <SmileIcon>😀</SmileIcon>
        <Title>
          올 한해는 <br />
          이렇게 관리했어요
        </Title>
      </TitleWrap>
      <BodyWrap>
        <Expense />
        <Income />
      </BodyWrap>
    </IncomeWrap>
  );
};

const IncomeWrap = styled.div`
  grid-column: 2 / 7;
  grid-row: 2 / 3;

  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const SmileIcon = styled.span`
  font-size: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
  margin-left: 10px;
  text-align: left;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default AccountAnalysis;
