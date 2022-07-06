import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import MarketPriceChart from "./MarketPriceChart";

const MarketPriceCard = () => {
  const navigate = useNavigate();

  const [kg, setKg] = useState(0);
  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }
  // 숫자만 입력가능
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }
  console.log(kg);

  function inputNumberFormat(e) {
    e.target.value = uncomma(e.target.value);
    setKg(e.target.value);
  }

  return (
    <Wrap>
      <BoxWrap>
        <Title>📈 오늘의 시세</Title>
        <ShowMoreBtn
          onClick={() => {
            navigate("/marketprice");
          }}
        >
          더 보기 &gt;
        </ShowMoreBtn>
      </BoxWrap>
      <BoxBodyWrap>
        <WrapLeft>
          <div>
            <RowWrap>
              <CategoryT>가락양재양곡시장</CategoryT>
              <Hr />
              <CategoryT>벼 - 흑미</CategoryT>
            </RowWrap>
            <PriceWrap>
              <TodayPrice>{comma(300)}</TodayPrice>
              <TodayPriceT>원/kg</TodayPriceT>
            </PriceWrap>
          </div>

          <WrapLeftBottom>
            <CategoryT>예상 판매 금액</CategoryT>
            <SumWrap>
              <KgInput
                onChange={(e) => {
                  inputNumberFormat(e);
                }}
                placeholder="0"
                maxLength={6}
              />
              <TodayPriceSumT>kg</TodayPriceSumT>
              <Sum>=</Sum>
              <TodayPriceSum>{comma(Math.floor(kg * 0.3))}</TodayPriceSum>
              <TodayPriceSumT>만원</TodayPriceSumT>
            </SumWrap>
            <Info>kg 수를 입력하고 예상 판매 금액을 조회해보세요.</Info>
          </WrapLeftBottom>
        </WrapLeft>
        <WrapRight>
          <ChartTitle>월별 평균 시세</ChartTitle>
          <MarketPriceChart />
        </WrapRight>
      </BoxBodyWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  grid-column: 3 / 5;
  grid-row: 2 / 4;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 7 / 10;
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

const BoxBodyWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
  }
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
`;

const WrapLeftBottom = styled.div`
  margin-top: 10px;
`;

const WrapRight = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* margin-left: 60px; */
  @media only screen and (max-width: 760px) {
    width: 100%;
  }
`;

const CategoryT = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

const ChartTitle = styled.span`
  font-weight: 500;
  font-size: 1rem;
`;

const PriceWrap = styled.div`
  margin-bottom: 16px;
`;

const TodayPrice = styled.span`
  font-weight: 500;
  font-size: 2rem;
`;

const TodayPriceSum = styled.span`
  font-weight: 500;
  font-size: 1.9rem;
  margin-bottom: 4px;
`;

const Sum = styled.span`
  font-weight: 400;
  font-size: 1rem;
  margin: 0px 8px;
`;

const SumWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TodayPriceT = styled.span`
  font-weight: 400;
  font-size: 1rem;
  margin-left: 4px;
`;

const TodayPriceSumT = styled.span`
  font-weight: 400;
  font-size: 1rem;
  margin-left: 4px;
  align-self: flex-end;
  margin-bottom: 8px;
`;

const Info = styled.span`
  font-weight: 400;
  font-size: 8px;
  margin-top: 4px;
`;

const KgInput = styled.input`
  width: 96px;
  height: 30px;
  background: #fafafa;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

const ShowMoreBtn = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
`;

export default MarketPriceCard;
