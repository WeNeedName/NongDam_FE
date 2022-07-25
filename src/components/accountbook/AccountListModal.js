import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAccountDB, ModifiAccountDB } from "../../redux/modules/account";
// 날짜 선택 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// 날짜 라이브러리
import moment from "moment";
import "moment/locale/ko";
import { CountertopsOutlined } from "@mui/icons-material";

const AccountListModal = ({
  isOpenList,
  MonthListToggleModal,
  month,
  accountList,
  ExpenseSum,
  IncomeSum,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 숫자 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  const reverseList = accountList !== undefined && [...accountList].reverse();
  // 같은 날짜끼리 묶어주기
  let mappedData = new Map();
  reverseList !== undefined &&
    reverseList.map((list) => {
      console.log(list);
      let original;
      if (mappedData.has(list.date)) original = mappedData.get(list.date);
      else original = [];

      original.push({
        type: list.type,
        category: list.category,
        price: list.price,
        memo: list.memo,
      });
      mappedData.set(list.date, original);
    });

  return (
    <StyledModal
      isOpen={isOpenList}
      onBackgroundClick={MonthListToggleModal}
      onEscapeKeydown={MonthListToggleModal}
    >
      <Title>{month + "월 결산"}</Title>
      <TopWrap>
        <ListNum>총 {accountList.length}건</ListNum>
        <PriceSumWrap>
          {isOpenList > 0 && (
            <PriceSumNumIn>+ {comma(IncomeSum)}원</PriceSumNumIn>
          )}

          {isOpenList > 0 && (
            <PriceSumNumEx>- {comma(ExpenseSum)}원</PriceSumNumEx>
          )}
        </PriceSumWrap>
      </TopWrap>

      {accountList.length > 0 ? (
        <BodyWrap>
          {mappedData &&
            [...mappedData].map((list, idx) => {
              return (
                <div key={idx}>
                  <DateT>{moment(list[0]).format("M월 D일")}</DateT>
                  <Hr />
                  {list[1] &&
                    list[1].map((data, idx) => {
                      console.log(data);
                      return (
                        <EventWrapB key={idx}>
                          <WhereToUseWrap>
                            <WhereToUseType>
                              {data.type === 0 && "농산물 판매"}
                              {data.type === 1 && "정부보조금"}
                              {data.type === 2 && "기타수입"}
                              {data.type === 3 && "비료"}
                              {data.type === 4 && "종자/종묘"}
                              {data.type === 5 && "농약"}
                              {data.type === 6 && "농기계"}
                              {data.type === 7 && "기타 농자재"}
                              {data.type === 8 && "유통비 및 판매 경비"}
                              {data.type === 9 && "고용노동비"}
                              {data.type === 10 && "임차료"}
                              {data.type === 11 && "수도광열비"}
                              {data.type === 12 && "기타 지출"}
                            </WhereToUseType>
                            <MemoT>{data.memo}</MemoT>
                          </WhereToUseWrap>

                          <Price category={data.category}>
                            {data.category === "수입"
                              ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                                "+" +
                                String(data.price).replace(
                                  /(\d)(?=(?:\d{3})+(?!\d))/g,
                                  "$1,"
                                )
                              : "-" +
                                String(data.price).replace(
                                  /(\d)(?=(?:\d{3})+(?!\d))/g,
                                  "$1,"
                                )}
                          </Price>
                        </EventWrapB>
                      );
                    })}
                </div>
              );
            })}
        </BodyWrap>
      ) : (
        <BodyWrap>
          <NoticeWrap>
            <NoticeT>거래 내역이 없습니다.</NoticeT>
          </NoticeWrap>
        </BodyWrap>
      )}
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  width: 360px;
  height: auto;
  background-color: white;
  border-radius: 10px;
  padding: 30px; 
  z-index: 100;
`;

const Wrap = styled.div`
  width: 360px;
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: red;
  position: absolute;
  top: 60px;
  left: 60px;
`;

const Title = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const DateT = styled.div`
  width: 100%;
  height: auto;
  color: #aaa;
  font-size: 14px;
  margin-top: 10px;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0px 10px 0px;
`;

const PriceSumWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PriceSumNumIn = styled.span`
  font-size: 13px;
  color: #2399dc;
`;

const PriceSumNumEx = styled.span`
  font-size: 13px;
  color: #eb3333;
  margin-left: 12px;
`;

const ListNum = styled.span`
  color: #aaa;
  font-size: 14px;
`;

const EventWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const EventWrapB = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const BodyWrap = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Hr = styled.div`
  width: 100%;
  border-top: 1px solid #dddddd;
  margin: 10px 0px;
`;

const WhereToUseWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const WhereToUseType = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 10px 4px 10px;
  background: transparent;
  border: 1px solid #616161;
  border-radius: 100px;
  font-size: 12px;
  color: #616161;
`;

const MemoT = styled.span`
  width: 186px;
  font-size: 12px;
  margin-left: 8px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const Price = styled.span`
  font-size: 16px;
  color: ${(props) => (props.category === "수입" ? "#2399DC" : "#EB3333")};
`;

const NoticeWrap = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoticeT = styled.span`
  color: #6f6f6f;
  font-size: 12px;
`;

export default AccountListModal;
