import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTodayMarketPriceDB } from "../../redux/modules/main";
import { getCropsListDB } from "../../redux/modules/users";
import { getInfoDB } from "../../redux/modules/users";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const TodayMarketPrice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const TodaymarketPriceData = useSelector(
    (state) => state.main.todayMarketPrice
  );
  const cropsData = useSelector((state) => state.users.crops);
  const userInfo = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const [selectedCrops, setSelectedCrops] = useState(21);
  const [checkedInputs, setCheckedInputs] = useState("소매");

  useEffect(() => {
    dispatch(getTodayMarketPriceDB(marketPriceCategory));
    dispatch(getCropsListDB());
  }, []);

  const marketPriceCategory = {
    productClsCode: checkedInputs,
    cropId:
      selectedCrops === 21 && userInfo !== null
        ? userInfo.crops[0].id
        : selectedCrops === 21
        ? selectedCrops
        : selectedCrops.value,
  };

  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

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
        {TodaymarketPriceData
          ? TodaymarketPriceData.country +
            " " +
            TodaymarketPriceData.wholeSale +
            "시장"
          : null}
      </Region>
      <SelecWrap>
        <StyledSelect
          name="crops"
          placeholder={"작물을 검색해보세요"}
          options={
            userInfo !== null
              ? userInfo.crops.map((crops) => {
                  return {
                    label: "[" + crops.type + "]" + " " + crops.name,
                    value: crops.id,
                  };
                })
              : cropsData.map((crops) => {
                  return {
                    label: "[" + crops.type + "]" + " " + crops.name,
                    value: crops.id,
                  };
                })
          }
          classNamePrefix="react-select"
          onChange={(value) => {
            setSelectedCrops(value);
          }}
        />

        <InputWrap>
          <input
            type="radio"
            id="소매"
            name="saleRadio"
            value="소매"
            onChange={changeRadio}
            checked={checkedInputs === "소매" ? true : false}
          />
          <label htmlFor="wholeSale">소매</label>
        </InputWrap>
        <InputWrap>
          <input
            type="radio"
            id="도매"
            name="saleRadio"
            onChange={changeRadio}
            value="도매"
            checked={checkedInputs === "도매" ? true : false}
          />
          <label htmlFor="retailSale">도매</label>
        </InputWrap>
      </SelecWrap>

      <SearchBtn
        onClick={() => {
          dispatch(getTodayMarketPriceDB(marketPriceCategory));
        }}
      >
        조회하기
      </SearchBtn>
      <BottomWrap>
        <Hr />
        <CategoryTWrap>
          <CategoryT> {TodaymarketPriceData.crop} </CategoryT>
          <DateT>
            {TodaymarketPriceData.latestDate !== ""
              ? moment(TodaymarketPriceData?.latestDate).format("YYYY.MM.DD") +
                " " +
                "기준"
              : null}
          </DateT>
        </CategoryTWrap>

        {TodaymarketPriceData.latestDate !== "" ? (
          <>
            <PriceWrap>
              <TodayPrice>
                {comma(TodaymarketPriceData?.latestDatePrice)}
              </TodayPrice>
              <TodayPriceT>원/{TodaymarketPriceData?.unit}</TodayPriceT>
            </PriceWrap>
          </>
        ) : (
          <NotFoundNoticeWrap>
            <NotFoundNotice>최근 조사된 데이터가 없습니다.</NotFoundNotice>
          </NotFoundNoticeWrap>
        )}
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

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  width: 40px;
  height: 18px;
  font-size: 10px;
  padding-bottom: 4px;
  border-radius: 100px;
  background: transparent;
  border: 1px solid #616161;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  color: #616161;
  cursor: pointer;
  &:hover {
    color: black;
    font-weight: 700;
    border: 1px solid black;
  }
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    color: black;
    font-weight: 700;
    border: 1px solid black;
  }
  &:checked + ${FormCheckText} {
    color: black;
    font-weight: 700;
    border: 1px solid black;
  }
  display: none;
`;

const Label = styled.label``;

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

const NotFoundNoticeWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NotFoundNotice = styled.span`
  color: #787c87;
  font-size: 11px;
  margin-top: 20px;
`;

export default TodayMarketPrice;
