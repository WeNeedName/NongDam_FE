import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../redux/modules/users";
import Select from "react-select";

// 이미지
import Profile from "../images/Profile.png";

// 컴포넌트 파일
import Header from "../components/Header";
import MarketPriceCard from "../components/marketPrice/MarketPriceCard";

const MarketPrice = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [selectedCrops, setSelectedCrops] = useState([]);
  const cropsData = useSelector((state) => state.users.crops);

  useEffect(() => {
    dispatch(getCropsListDB());
  }, []);

  return (
    <div>
      <Header currentPage="marketPrice" />
      <Wrap>
        <BodyWrap>
          <Title>품목선택</Title>
          <CategoryWrap>
            <SelecWrap>
              <SelecTitle>품목</SelecTitle>
              {/* <Selec onChange={(e) => setCategory(e.target.value)}>
                {cropsData !== undefined
                  ? cropsData.map((crops) => {
                      return <option value={crops.id}>{crops.name}</option>;
                      // { label: crops.name, value: crops.id };
                    })
                  : null}
              </Selec> */}

              <Select
                className="react-select"
                name="crops"
                options={
                  cropsData !== undefined
                    ? cropsData.map((crops) => {
                        return { label: crops.name, value: crops.id };
                      })
                    : null
                }
                onChange={(value) => {
                  setSelectedCrops(value);
                }}
                classNamePrefix="select"
              />
            </SelecWrap>
          </CategoryWrap>
          <MarketPriceCard />

          <BottomWrap>
            <Title>내 작물 시세 추이</Title>
            <MyCropsChartWrap>
              <MarketPriceCard />
              <MarketPriceCard />
              <MarketPriceCard />
              <MarketPriceCard />
            </MyCropsChartWrap>
          </BottomWrap>
        </BodyWrap>
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr 72% 1fr;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr 81% 1fr;
  }
`;

const BodyWrap = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
`;

const SelecWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;

const SelecTitle = styled.span`
  font-size: 14px;
  margin-bottom: 10px;
`;

const Selec = styled.select`
  width: 160px;
  font-size: 11px;
  height: 24px;
  background-color: white;
  border: 1px solid #616161;
  padding: 0px 6px;
  color: #616161;
  border-radius: 6px;
  .react-select {
    width: 200px;
  }
`;

const BottomWrap = styled.div`
  margin-top: 30px;
`;

const MyCropsChartWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;

export default MarketPrice;
