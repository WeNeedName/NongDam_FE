import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// 차트 라이브러리
import ApexCharts from "react-apexcharts";

import moment from "moment";
import "moment/locale/ko";

// 컴포넌트
import TotalHarvestChart from "./TotalHarvestChart";

const TotalHarvest = ({
  totalHarvestData,
  setHarvestCaterory,
  harvestCaterory,
}) => {
  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setHarvestCaterory(e.target.id);
    }
  };

  return (
    <>
      <Wrap>
        <Title>수확량</Title>
        <CategoryWrap>
          <Label>
            <FormCheckLeft
              type="radio"
              id="month"
              name="totalHarvestCategory"
              onChange={changeRadio}
              value={harvestCaterory}
              defaultChecked
            />
            <FormCheckText>월별</FormCheckText>
          </Label>
          <Label>
            <FormCheckLeft
              type="radio"
              id="year"
              name="totalHarvestCategory"
              onChange={changeRadio}
              value={harvestCaterory}
            />
            <FormCheckText>연도별</FormCheckText>
          </Label>
        </CategoryWrap>
        {harvestCaterory === "month" && (
          <TotalHarvestChart totalHarvestData={totalHarvestData} />
        )}
        {harvestCaterory === "year" && (
          <TotalHarvestChart totalHarvestData={totalHarvestData} />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  grid-column: 2 / 6;
  grid-row: 3 / 4;

  background: #ffffff;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 14px;
  /* margin: 8px 0px; */
`;

const FormCheckText = styled.span`
  width: auto;
  height: 26px;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  margin-right: 4px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
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

const ChartWrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  row-gap: 4px;
  column-gap: 8px;
  cursor: pointer;
  margin-top: 12px;
`;

const YasisWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
`;

const Yasis = styled.span`
  font-size: 8px;
  color: #666666;
`;

const ChartBox = styled.div`
  width: 100%;
  margin-top: 6px;
  background: #fafafa;
  box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.17);
  border-radius: 4px;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  position: relative;
`;

const YasisLabelBox = styled.div`
  max-width: 150px;
  width: 28%;
  height: auto;
  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  right: 0;
  top: 0;
  margin: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media only screen and (max-width: 760px) {
    width: 100px;
    margin: 6px 10px;
  }
`;

const YasisLabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const YasisColorTipA = styled.div`
  width: 7px;
  height: 3px;
  background: #3152bf;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisColorTipB = styled.div`
  width: 7px;
  height: 3px;
  background: #7eb3e3;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisColorTipC = styled.div`
  width: 7px;
  height: 3px;
  background: #7ee3ab;
  margin-right: 4px;
  @media only screen and (max-width: 760px) {
    width: 4px;
    height: 4px;
  }
`;

const YasisLabel = styled.span`
  font-size: 11px;
  color: #666666;
`;

const XasisWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0px 10px;
  /* margin-top: 4px; */
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

const Xasis = styled.span`
  font-size: 8px;
  color: #666666;
`;

export default TotalHarvest;
