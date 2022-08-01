import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
// 로딩 효과
import { ShimmerThumbnail } from "react-shimmer-effects";

// 컴포넌트
import TotalHarvestChart from "./TotalHarvestChart";

const TotalHarvest = ({
  totalHarvestData,
  setHarvestCaterory,
  harvestCaterory,
}) => {
  const is_loaded = useSelector(
    (state) => state.analysis.totalharvest_is_loaded
  );

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setHarvestCaterory(e.target.id);
    }
  };

  const allDataList = [];
  totalHarvestData.datas !== undefined &&
    totalHarvestData.datas.map((list, idx) => {
      return allDataList.push(...list.data);
    });
  const allDataListSort = allDataList.sort((a, b) => b - a);

  return (
    <>
      <Wrap>
        <Title>수확량</Title>
        {is_loaded ? (
          <>
            {allDataListSort.length !== 0 && allDataListSort[0] !== "0" ? (
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
            ) : null}

            {harvestCaterory === "month" && (
              <TotalHarvestChart totalHarvestData={totalHarvestData} />
            )}
            {harvestCaterory === "year" && (
              <TotalHarvestChart totalHarvestData={totalHarvestData} />
            )}
          </>
        ) : (
          <ShimmerWrap>
            <ShimmerThumbnail
              className="thumNail-weather"
              height={200}
              rounded
            />
          </ShimmerWrap>
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
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }
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

const ShimmerWrap = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default TotalHarvest;
