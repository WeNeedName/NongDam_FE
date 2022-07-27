import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const TodaysSalePrice = ({ salePrice }) => {
  const userInfo = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  const [kg, setKg] = useState(0);
  // 숫자에 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }
  // 숫자만 입력가능
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    e.target.value = uncomma(e.target.value);
    setKg(e.target.value);
  }

  const sellingPrice = Number(kg * salePrice);

  return (
    <Wrap>
      {userInfo?.address === "" ? (
        <NoticeWrap>
          <NoticeT>
            지금 지역을 등록하고
            <br />
            예상판매 금액을 확인해보세요!
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
            <br />
            예상판매 금액을 확인해보세요!
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
      <CategoryT>💵 예상 판매 금액</CategoryT>
      <Info>kg 수를 입력하고 예상 판매 금액을 조회해보세요.</Info>
      <SumWrap>
        <KgInput
          onChange={(e) => {
            inputNumberFormat(e);
          }}
          placeholder="0"
          maxLength={6}
        />
        <TodayPriceSumT>kg</TodayPriceSumT>
      </SumWrap>
      <BottomWrap>
        <Hr />
        {salePrice !== 0 ? (
          <SellingPrice>
            {sellingPrice < 1000
              ? kg * salePrice + "원"
              : sellingPrice < 10000
              ? String(sellingPrice).slice(-4, -3) +
                "천" +
                " " +
                String(sellingPrice).slice(-3) +
                "원"
              : String(sellingPrice).slice(-4, -3) === "0" &&
                String(sellingPrice).slice(0, -4).length < 3
              ? String(sellingPrice).slice(0, -4) +
                "만" +
                " " +
                String(sellingPrice).slice(-3) +
                "원"
              : String(sellingPrice).slice(0, -4).length < 3
              ? String(sellingPrice).slice(0, -4) +
                "만" +
                " " +
                String(sellingPrice).slice(-4, -3) +
                "천원"
              : comma(String(sellingPrice).slice(0, -4)) + "만원"}
          </SellingPrice>
        ) : (
          <NotFoundNoticeWrap>
            <NotFoundNotice>판매 금액을 예상할 수 없습니다.</NotFoundNotice>
          </NotFoundNoticeWrap>
        )}
      </BottomWrap>
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
  grid-column: 4 / 5;
  grid-row: 1 / 2;
  position: relative;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 4 / 5;
  }
`;

const CategoryT = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 10px;
  margin-bottom: 10px;
`;

const Info = styled.span`
  font-weight: 400;
  font-size: 12px;
  margin-top: 4px;
`;

const SumWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const TodayPriceSumT = styled.span`
  font-weight: 400;
  font-size: 14px;
  margin-left: 4px;
  align-self: flex-end;
  margin-bottom: 8px;
`;

const SellingPrice = styled.span`
  font-weight: 700;
  font-size: 24px;
  margin-left: 4px;
  margin-top: 30px;
  animation: ${boxFade} 1s;
`;

const KgInput = styled.input`
  width: 120px;
  height: 30px;
  background: #fafafa;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -20px;
  padding-right: 44px;
  border-bottom: 0.5px solid #dddddd;
`;

const NotFoundNoticeWrap = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
`;

const NotFoundNotice = styled.span`
  color: #787c87;
  font-size: 13px;
  margin-top: 20px;
`;

const NoticeWrap = styled.div`
  width: 100%;
  height: 83%;
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

export default TodaysSalePrice;
