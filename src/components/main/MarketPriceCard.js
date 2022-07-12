import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getMarketPriceDB } from "../../redux/modules/main";
import { getCropsListDB } from "../../redux/modules/users";
import { getInfoDB } from "../../redux/modules/users";

const TodayMarketPrice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const marketPriceData = useSelector((state) => state.main.marketPrice);
  const cropsData = useSelector((state) => state.users.crops);
  const userInfo = useSelector((state) => state.users.user);

  const [selectedCrops, setSelectedCrops] = useState(21);
  const [selectedRadio, setSelectedRadio] = useState("소매");

  useEffect(() => {
    dispatch(getMarketPriceDB(marketPriceCategory));
    dispatch(getCropsListDB());
  }, [selectedCrops, selectedRadio]);

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const marketPriceCategory = {
    productClsCode: selectedRadio,
    gradeRank: "상품",
    cropId: selectedCrops,
  };

  console.log(userInfo);
  console.log(marketPriceData);

  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  const changeRadio = (e) => {
    setSelectedRadio(e.target.value);
    console.log(e.target.value);
  };
  console.log(selectedRadio);
  console.log(selectedCrops);
  return (
    <Wrap>
      <TopWrap>
        <Title>📈 오늘의 시세</Title>
        <ShowMoreBtn
          onClick={() => {
            navigate("/marketprice");
          }}
        >
          더 보기 &gt;
        </ShowMoreBtn>
      </TopWrap>

      <SubTitle>내 농장작물의 오늘 시세를 알아보세요.</SubTitle>
      <Region>
        {marketPriceData &&
          marketPriceData.country + " " + marketPriceData.wholesale + "시장"}
      </Region>
      <SelecWrap>
        <StyledSelect
          name="crops"
          placeholder={"작물을 검색해보세요"}
          options={
            cropsData !== undefined
              ? cropsData.map((crops) => {
                  return { label: crops.name, value: crops.id };
                })
              : null
          }
          classNamePrefix="react-select"
          onChange={(value) => {
            setSelectedCrops(value);
          }}
        />

        <RadioWrap>
          <InputWrap>
            <input
              type="radio"
              id="wholeSale"
              name="saleCategory"
              value="소매"
              checked
              onChange={changeRadio}
            />
            <label htmlFor="wholeSale">소매</label>
          </InputWrap>
          <InputWrap>
            <input
              type="radio"
              id="retailSale"
              name="saleCategory"
              value="도매"
              onChange={changeRadio}
            />
            <label htmlFor="retailSale">도매</label>
          </InputWrap>
        </RadioWrap>
      </SelecWrap>

      <SearchBtn>조회하기</SearchBtn>
      <BottomWrap>
        <Hr />
        <CategoryTWrap>
          <CategoryT> 딸기 </CategoryT>
          <DateT>2022.07.10 기준</DateT>
        </CategoryTWrap>

        <PriceWrap>
          <TodayPrice>{comma(300)}</TodayPrice>
          <TodayPriceT>원/{marketPriceData?.unit}</TodayPriceT>
        </PriceWrap>
      </BottomWrap>
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
  grid-column: 3 / 4;
  grid-row: 2 / 5;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 7 / 10;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ShowMoreBtn = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

const Region = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin: 10px 0px;
`;

const SubTitle = styled.span`
  margin: 4px 0px;
`;

const StyledSelect = styled(Select)`
  width: 200px;
  height: 30px;
  margin: 0px 0px 20px 0px;
  & .Select {
    &__control {
      display: flex;
      align-items: center;
      border-radius: 0;
      border: none;
      height: 100%;
      height: 20px;
    }
  }
`;

const SearchBtn = styled.button`
  width: 60px;
  height: 24px;
  font-size: 11px;
  color: #616161;
  padding: 4px;
  background: #ffffff;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  &:hover {
    color: black;
    border: 1px solid black;
  }
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -20px;
  padding-right: 40px;
  border-bottom: 0.5px solid #dddddd;
`;

const PriceWrap = styled.div`
  /* margin-bottom: 16px; */
`;

const TodayPrice = styled.span`
  font-weight: 500;
  font-size: 2rem;
`;

const TodayPriceT = styled.span`
  font-weight: 400;
  font-size: 1rem;
  margin-left: 4px;
`;

const CategoryTWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: flex-end;
`;

const CategoryT = styled.span`
  font-weight: 700;
  font-size: 13px;
`;

const DateT = styled.span`
  font-size: 10px;
  color: #6f6f6f;
  margin-left: 6px;
`;

const SelecWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 6px;
`;

export default TodayMarketPrice;
