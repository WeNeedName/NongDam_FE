import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Select from "react-select";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getTodayMarketPriceDB } from "../../redux/modules/main";
import { getCropsListDB } from "../../redux/modules/users";
import { getInfoDB } from "../../redux/modules/users";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";

// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";

const TodaysMarketPrice = ({ cropsData, setSalePrice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_loaded = useSelector((state) => state.main.marketPrice_is_loaded);
  const TodaymarketPriceData = useSelector(
    (state) => state.main.todayMarketPrice
  );
  const marketPriceData = useSelector((state) => state.main.marketPrice);
  const userInfo = useSelector((state) => state.users.user);

  const marketName =
    marketPriceData !== undefined && marketPriceData[0]?.country;

  const [selectedCrops, setSelectedCrops] = useState(21);
  const [checkedInputs, setCheckedInputs] = useState("소매");

  useEffect(() => {
    dispatch(getTodayMarketPriceDB(marketPriceCategory));
    dispatch(getInfoDB());
  }, []);

  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  useEffect(() => {
    if (Number(uncomma(TodaymarketPriceData?.latestDatePrice)) > 0)
      setSalePrice(Number(uncomma(TodaymarketPriceData?.latestDatePrice)));
    else setSalePrice(0);
  }, [TodaymarketPriceData]);

  const marketPriceCategory = {
    productClsCode: checkedInputs,
    cropId:
      selectedCrops === 21 && userInfo !== null
        ? userInfo?.crops[0]?.id
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
      {is_loaded ? (
        <>
          {userInfo?.countryCode === 0 ? (
            <NoticeWrap>
              <NoticeT>
                지금 시세지역과 작물을 등록하고
                <br />내 작물의 시세를 확인해보세요!
              </NoticeT>
              <NoticeBtn
                onClick={() => {
                  navigate("/mypage/editmemberinfo");
                }}
              >
                등록하러 가기
              </NoticeBtn>
            </NoticeWrap>
          ) : userInfo?.crops.length === 0 ? (
            <NoticeWrap>
              <NoticeT>
                지금 작물을 등록하고
                <br />내 작물의 시세를 확인해보세요!
              </NoticeT>
              <NoticeBtn
                onClick={() => {
                  navigate("/mypage/editmemberinfo");
                }}
              >
                등록하러 가기
              </NoticeBtn>
            </NoticeWrap>
          ) : null}
          <Title>📈 오늘의 시세</Title>
          <SubTitle>내 농장작물의 오늘 시세를 알아보세요</SubTitle>
          <Region>
            {marketName !== undefined
              ? marketName + " " + "도소매시장"
              : "서울 도소매시장"}
          </Region>
          <SelecWrap>
            {userInfo?.countryCode !== 0 && userInfo?.crops.length !== 0 ? (
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
            ) : null}

            <RadioWrap>
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
            </RadioWrap>
          </SelecWrap>
          <SearchBtn
            onClick={() => {
              dispatch(getTodayMarketPriceDB(marketPriceCategory));
            }}
          >
            조회하기
          </SearchBtn>
          <Hr />
          {userInfo?.countryCode !== 0 && userInfo?.crops.length !== 0 && (
            <BottomWrap>
              <CategoryTWrap>
                <CategoryT> {TodaymarketPriceData.crop} </CategoryT>
                <DateT>
                  {TodaymarketPriceData.latestDate !== ""
                    ? moment(TodaymarketPriceData?.latestDate).format(
                        "YYYY.MM.DD"
                      ) +
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
                  <NotFoundNotice>
                    최근 조사된 데이터가 없습니다.
                  </NotFoundNotice>
                </NotFoundNoticeWrap>
              )}
            </BottomWrap>
          )}
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
          <BottomWrap>
            <Hr />
            <ShimmerThumbnail className="thumNail-selec" height={40} rounded />
          </BottomWrap>
        </>
      )}
    </Wrap>
  );
};

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5%);
 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrap = styled.div`
  width: 90%;
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 24px 24px 20px 20px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  grid-column: 3 / 4;
  grid-row: 1 / 2;
  position: relative;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    height: 340px;
  }
`;
const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 10px;
  margin-bottom: 10px;
`;

const Region = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin: 16px 0px 10px 0px;
`;

const SubTitle = styled.span`
  margin: 4px 0px 6px 0px;
  font-size: 14px;
`;

const StyledSelect = styled(Select)`
  width: 200px;
  height: 30px;
  margin: 0px 0px 20px 0px;
  font-size: 14px;
  @media only screen and (max-width: 1220px) {
    width: 180px;
  }
`;

const SearchBtn = styled.button`
  width: 70px;
  height: 32px;
  font-size: 14px;
  color: #616161;
  padding: 4px;
  background: #ffffff;
  border: 1px solid #bfbfbf;
  border-radius: 6px;

  &:hover {
    color: black;
    border: 1px solid black;
  }
  @media only screen and (max-width: 760px) {
    margin-top: 6px;
  }
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${boxFade} 1s;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -20px;
  padding-right: 44px;
  border-bottom: 0.5px solid #dddddd;
  margin-top: 20px;
`;

const PriceWrap = styled.div`
  /* margin-bottom: 16px; */
`;

const TodayPrice = styled.span`
  font-weight: 500;
  font-size: 30px;
`;

const TodayPriceT = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-left: 4px;
`;

const CategoryTWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 4px;
  align-items: flex-end;
`;

const CategoryT = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

const DateT = styled.span`
  font-size: 12px;
  color: #6f6f6f;
  margin-left: 10px;
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
  font-size: 12px;
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
  margin: 0px 0px 0px 0px;
  margin-bottom: 14px;
  margin-top: 4px;
  input {
    color: black;
    background-color: black;
  }
  input:select {
    color: black;
    background-color: black;
  }
  label {
    font-size: 14px;
    margin-right: 8px;
    @media only screen and (max-width: 760px) {
      font-size: 16px;
      margin-right: 8px;
    }
  }
`;

const NotFoundNoticeWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 760px) {
    height: 80px;
  }
`;

const NotFoundNotice = styled.span`
  color: #787c87;
  font-size: 14px;
  margin-top: 20px;
  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
`;

const NoticeWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
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
  @media only screen and (max-width: 760px) {
    margin-top: 8px;
    font-size: 14px;
  }
`;

export default TodaysMarketPrice;
