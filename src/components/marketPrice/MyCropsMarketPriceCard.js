import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// 컴포넌트
import MarketPriceMonthChart from "./MyCropsMonthChart";
import MarketPriceYearChart from "./MyCropsYearChart";

const MarketPriceCard = () => {
  const navigate = useNavigate();
  const [checkedInputs, setCheckedInputs] = useState("month");

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };
  return (
    <Wrap>
      <div>
        <RowWrap>
          <CategoryT>가락양재양곡시장</CategoryT>
          <Hr />
          <CategoryT>벼 - 흑미</CategoryT>
        </RowWrap>
      </div>

      <CategoryChartWrap>
        <CategoryWrap>
          <Label>
            <FormCheckLeft
              type="radio"
              id="month"
              name="MyCropsCaterory"
              onChange={changeRadio}
              value={checkedInputs}
              defaultChecked
            />
            <FormCheckText>월별</FormCheckText>
          </Label>
          <Label>
            <FormCheckLeft
              type="radio"
              id="year"
              name="MyCropsCaterory"
              onChange={changeRadio}
              value={checkedInputs}
            />
            <FormCheckText>연도별</FormCheckText>
          </Label>
        </CategoryWrap>

        {checkedInputs === "month" && <MarketPriceMonthChart />}
        {checkedInputs === "year" && <MarketPriceYearChart />}
      </CategoryChartWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 400px;
  height: 100%;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 16px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin-right: 20px;
`;

const RowWrap = styled.div`
  width: 400px;
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

const CategoryChartWrap = styled.div`
  width: 100%;
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

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0px;
`;

const FormCheckText = styled.span`
  width: auto;
  height: 26px;
  font-weight: 400;
  font-size: 11px;
  line-height: 24px;
  margin-right: 4px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color: black;
  &:hover {
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    font-weight: 700;
    border-bottom: 2px solid #000000;
  }
  display: none;
`;

const Label = styled.label``;

export default MarketPriceCard;
