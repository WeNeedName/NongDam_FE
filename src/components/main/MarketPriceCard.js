import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const MarketPriceCard = () => {
  return (
    <Wrap>
      <BoxWrap>
        <Title>📈 오늘의 시세</Title>
        <ShowMoreBtn>더 보기 &gt;</ShowMoreBtn>
      </BoxWrap>
      <BoxWrap>
        <WrapLeft>
          <RowWrap>
            <span>가락양재양곡시장</span>
            <Hr />
            <span>벼 - 흑미</span>
          </RowWrap>

          <div>
            <span>300</span>
            <span>원/kg</span>
          </div>
          <span>예상 판매 금액</span>
          <div>
            <input placeholder="kg을 입력해주세요." />
            <span>kg</span>
            <span>300</span>
            <span>원</span>
          </div>
        </WrapLeft>
        <WrapLeft>
          {/* <span>월별 평균 시세</span>
          <ChartBox></ChartBox> */}
        </WrapLeft>
      </BoxWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  grid-column: 3 / 5;
  grid-row: 2 / 4;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 6 / 7;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 1.4em;
  line-height: 10px;
`;

const BoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RowWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Hr = styled.div`
  width: 1px;
  height: 10px;
  border-right: 1.6px solid black;
  /* margin-top: 6px; */
  margin: 2px 4px 0px 4px;
`;

const WrapLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const ChartBox = styled.div`
  margin-top: 18px;
  padding: 0px 20px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
`;

const ShowMoreBtn = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
`;

export default MarketPriceCard;
