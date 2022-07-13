import React, { useEffect, useState } from "react";
import styled from "styled-components";

const TodaysSalePrice = ({ salePrice }) => {
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

  function inputNumberFormat(e) {
    e.target.value = uncomma(e.target.value);
    setKg(e.target.value);
  }

  const sellingPrice = Number(kg * salePrice);
  console.log(salePrice);
  return (
    <Wrap>
      <CategoryT>💵 예상 판매 금액</CategoryT>
      <Info>kg 수를 입력하고 예상 판매 금액을 조회해보세요.</Info>
      <SumWrap>
        <KgInput
          onChange={(e) => {
            inputNumberFormat(e);
          }}
          placeholder="0"
          maxLength={6}
        />
        <TodayPriceSumT>kg</TodayPriceSumT>
      </SumWrap>
      <BottomWrap>
        <Hr />
        {salePrice === 0 ? (
          <NotFoundNoticeWrap>
            <NotFoundNotice>판매 금액을 예상할 수 없습니다.</NotFoundNotice>
          </NotFoundNoticeWrap>
        ) : (
          <SellingPrice>
            {sellingPrice < 1000
              ? kg * salePrice + "원"
              : sellingPrice < 10000
              ? String(sellingPrice).slice(-4, -3) +
                "천" +
                " " +
                String(sellingPrice).slice(-3) +
                "원"
              : String(sellingPrice).slice(-4, -3) === "0" &&
                String(sellingPrice).slice(0, -4).length < 3
              ? String(sellingPrice).slice(0, -4) +
                "만" +
                " " +
                String(sellingPrice).slice(-3) +
                "원"
              : String(sellingPrice).slice(0, -4).length < 3
              ? String(sellingPrice).slice(0, -4) +
                "만" +
                " " +
                String(sellingPrice).slice(-4, -3) +
                "천원"
              : comma(String(sellingPrice).slice(0, -4)) + "만원"}
          </SellingPrice>
        )}
      </BottomWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 90%;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  grid-column: 4 / 5;
  grid-row: 1 / 2;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }
`;

const CategoryT = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

const Info = styled.span`
  font-weight: 400;
  font-size: 8px;
  margin-top: 4px;
`;

const SumWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const TodayPriceSumT = styled.span`
  font-weight: 400;
  font-size: 1rem;
  margin-left: 4px;
  align-self: flex-end;
  margin-bottom: 8px;
`;

const SellingPrice = styled.span`
  font-weight: 700;
  font-size: 24px;
  margin-left: 4px;
  margin-top: 30px;
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

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -20px;
  padding-right: 40px;
  border-bottom: 0.5px solid #dddddd;
`;

const NotFoundNoticeWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NotFoundNotice = styled.span`
  color: #787c87;
  font-size: 11px;
  margin-top: 20px;
`;

export default TodaysSalePrice;
