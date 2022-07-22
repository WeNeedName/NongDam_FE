import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";
// 컴포넌트
import AnalysisSalesChart from "./AnalysisSalesChart";

const AnalysisCard = ({ salesData }) => {
  const navigate = useNavigate();
  const is_loaded = useSelector((state) => state.main.analysis_is_loaded);
  const userInfo = useSelector((state) => state.users.user);

  const [checkedInputs, setCheckedInputs] = useState("sales");

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  console.log(salesData);

  return (
    <Wrap>
      {is_loaded ? (
        <>
          {userInfo?.address === "" ? (
            <NoticeWrap>
              <NoticeT>
                지금 장부를 작성하고
                <br />내 매출 현황을 확인해보세요!
              </NoticeT>
              <NoticeBtn
                onClick={() => {
                  navigate("/accountbook");
                }}
              >
                작성하러 가기
              </NoticeBtn>
            </NoticeWrap>
          ) : userInfo?.crops.length === 0 ? (
            <NoticeWrap>
              <NoticeT>
                마이페이지에서 지역과 작물 등록 후 서비스를 이용하시면
                <br />
                다양한 통계 정보를 확인하실 수 있습니다
              </NoticeT>
              <NoticeBtn
                onClick={() => {
                  navigate("/mypage");
                }}
              >
                등록하러 가기
              </NoticeBtn>
            </NoticeWrap>
          ) : null}
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
                className="thumNail-analysis"
                height={50}
                rounded
              />
            </ThumNailChartWrap>
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
  flex-direction: column;
  justify-content: flex-end;
  margin-top: 10px;
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
export default AnalysisCard;
