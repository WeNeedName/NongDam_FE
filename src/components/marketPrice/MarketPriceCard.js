import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getMarketPriceDB } from "../../redux/modules/main";
import { getInfoDB } from "../../redux/modules/users";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";

// 컴포넌트
import MarketPriceMonthChart from "./MarketPriceMonthChart";
import MarketPriceYearChart from "./MarketPriceYearChart";

const MarketPriceCard = ({ cropsData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkedInputs, setCheckedInputs] = useState("month");
  const [selectedCrops, setSelectedCrops] = useState(21);
  const marketPriceData = useSelector((state) => state.main.marketPrice);
  const userInfo = useSelector((state) => state.users.user);
  const is_loaded = useSelector(
    (state) => state.main.searchMarketPrice_is_loaded
  );

  const marketName = userInfo?.address.split(" ")[0];

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  useEffect(() => {
    dispatch(getMarketPriceDB(data));
  }, [checkedInputs, selectedCrops]);

  const data = {
    cropId: selectedCrops === 21 ? 21 : selectedCrops.value,
    data: checkedInputs,
  };

  return (
    <Wrap>
      {is_loaded ? (
        <>
          <CategoryT>📈 작물 조회</CategoryT>
          <SubTitle>궁금한 작물의 시세를 알아보세요.</SubTitle>
          <Region>
            {marketName !== undefined
              ? marketName + " " + "도소매시장"
              : "서울 도소매시장"}
          </Region>
          <StyledSelect
            // styles={customStyles}
            name="crops"
            placeholder={"작물을 검색해보세요"}
            options={
              cropsData !== undefined
                ? cropsData.map((crops) => {
                    return {
                      label: "[" + crops.type + "]" + " " + crops.name,
                      value: crops.id,
                    };
                  })
                : null
            }
            classNamePrefix="react-select"
            onChange={(value) => {
              setSelectedCrops(value);
            }}
          />
          <CategoryChartWrap>
            <CategoryWrap>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="month"
                  name="AllCropsCaterory"
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
                  name="AllCropsCaterory"
                  onChange={changeRadio}
                  value={checkedInputs}
                />
                <FormCheckText>연도별</FormCheckText>
              </Label>
            </CategoryWrap>

            {checkedInputs === "month" && (
              <MarketPriceMonthChart
                marketPriceData={marketPriceData}
                selectedCrops={selectedCrops}
              />
            )}
            {checkedInputs === "year" && (
              <MarketPriceYearChart
                marketPriceData={marketPriceData}
                selectedCrops={selectedCrops}
              />
            )}
          </CategoryChartWrap>
        </>
      ) : (
        <>
          <ShimmerTitle
            className="thumNail-title"
            line={2}
            gap={10}
            variant="secondary"
          />
          <ShimmerThumbnail className="thumNail-selec" height={40} rounded />

          <ShimmerThumbnail className="thumNail-chart" height={140} rounded />
        </>
      )}
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
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

const Region = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin: 10px 0px;
`;

const SubTitle = styled.span`
  margin: 4px 0px;
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
  font-size: 18px;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  /* margin: 8px 0px; */
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

const StyledSelect = styled(Select)`
  width: 200px;
  height: 30px;
  margin: 0px 0px 20px 0px;
`;

export default MarketPriceCard;
