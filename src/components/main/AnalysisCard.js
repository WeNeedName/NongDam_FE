import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";
// 컴포넌트
import AnalysisSalesChart from "./AnalysisSalesChart";
import AnalysisTotalHarvestChart from "./AnalysisTotalHarvestChart";
import Income from "./Income";
import Expense from "./Expense";
import WorkTimeBarChart from "./WorkTimeBarChart";

const AnalysisCard = ({
  salesData,
  totalHarvestData,
  expenseData,
  incomeData,
  workTimeData,
}) => {
  const navigate = useNavigate();
  const is_loaded = useSelector((state) => state.analysis.sales_is_loaded);
  const userInfo = useSelector((state) => state.users.user);

  const [checkedInputs, setCheckedInputs] = useState("sales");

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }

  return (
    <Wrap>
      {is_loaded ? (
        <>
          <TopWrap>
            <Title>📊 농장 관리 현황</Title>
            <ShowMoreBtn
              onClick={() => {
                navigate("/analysis");
              }}
            >
              더 보기
            </ShowMoreBtn>
          </TopWrap>

          <CategoryWrap>
            <Label>
              <FormCheckLeft
                type="radio"
                id="sales"
                name="AnalysisRadioButton"
                onChange={changeRadio}
                value={checkedInputs}
                defaultChecked
              />
              <FormCheckText>매출 현황</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="totalHarvest"
                name="AnalysisRadioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>수확량</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="account"
                name="AnalysisRadioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>수입 및 지출</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="workTime"
                name="AnalysisRadioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>작업시간</FormCheckText>
            </Label>
          </CategoryWrap>
          <ChartWrap>
            {checkedInputs === "sales" && (
              <AnalysisSalesChart salesData={salesData} />
            )}
            {checkedInputs === "totalHarvest" && (
              <AnalysisTotalHarvestChart totalHarvestData={totalHarvestData} />
            )}
            {checkedInputs === "account" && (
              <>
                {incomeData?.data !== undefined &&
                expenseData?.data !== undefined &&
                incomeData?.data.length !== 0 &&
                expenseData?.data.length !== 0 ? (
                  <BodyWrap>
                    <Income incomeData={incomeData} />
                    <Expense expenseData={expenseData} />
                  </BodyWrap>
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
              </>
            )}
            {checkedInputs === "workTime" && (
              <WorkTimeBarChart workTimeData={workTimeData} />
            )}
          </ChartWrap>
        </>
      ) : (
        <>
          <ThumNailWrap>
            <ShimmerTitle
              className="thumNail-news-title"
              line={1}
              gap={10}
              variant="secondary"
            />
            <ShimmerText className="thumNail-data-label" line={1} gap={10} />
            <ThumNailChartWrap>
              <ShimmerThumbnail
                className="thumNail-button"
                height={20}
                rounded
              />
              <ShimmerThumbnail
                className="thumNail-button"
                height={20}
                rounded
              />
              <ShimmerThumbnail
                className="thumNail-button"
                height={20}
                rounded
              />
            </ThumNailChartWrap>
            <ShimmerThumbnail
              className="thumNail-analysis"
              height={200}
              rounded
            />
          </ThumNailWrap>
        </>
      )}
    </Wrap>
  );
};

const ThumNailWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ThumNailChartWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(1%);
 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 16px 20px;
  background-color: #fff;
  grid-column: 3 / 5;
  grid-row: 5 / 8;
  position: relative;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 10 / 12;
    padding: 20px 20px 20px 20px;
    display: none;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 10px;
  margin-bottom: 4px;
`;

const ShowMoreBtn = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px 16px 0px;
  @media only screen and (max-width: 760px) {
    padding-bottom: 10px;
  }
`;

const FormCheckText = styled.span`
  width: auto;
  height: 26px;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  margin-right: 16px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
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
  @media only screen and (max-width: 760px) {
    margin-top: 20px;
  }
`;

const NoticeWrap = styled.div`
  width: 100%;
  height: 73%;
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
  margin-bottom: 13px;
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
  margin-bottom: 1px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 50px;
  margin-right: 20px;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

export default AnalysisCard;
