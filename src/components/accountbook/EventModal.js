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

const EventModal = ({ isOpen, toggleModal, eventInfo, accountList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(eventInfo);

  // accountList date 포맷 가공
  const eventInfoDay = moment(eventInfo.start).format("YYYY-MM-DD");
  const eventInfoDayFormat = moment(eventInfo.start).format("M월 D일");

  // 클릭한 날짜로 accountList 필터링
  const filteredList =
    accountList && accountList.filter((v) => v.date === eventInfoDay);

  // 숫자 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  // filteredList 에서 수입 가격의 총합
  const filteredIncome =
    filteredList && filteredList.filter((v) => v.category === "수입");
  const filteredIncomePrice =
    filteredIncome &&
    filteredIncome.map((v) => {
      return v.price;
    });
  const IncomeSum = filteredIncomePrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // filteredList 에서 지출 가격의 총합
  const filtereExpense =
    filteredList && filteredList.filter((v) => v.category === "지출");
  const filteredExpensePrice =
    filtereExpense &&
    filtereExpense.map((v) => {
      return v.price;
    });
  const ExpenseSum = filteredExpensePrice.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Title>{eventInfoDayFormat}</Title>
      <TopWrap>
        <ListNum>총 {filteredList.length}건</ListNum>
        <PriceSumWrap>
          {filteredIncome.length > 0 && (
            <PriceSumNumIn>+ {comma(IncomeSum)}원</PriceSumNumIn>
          )}

          {filtereExpense.length > 0 && (
            <PriceSumNumEx>- {comma(ExpenseSum)}원</PriceSumNumEx>
          )}
        </PriceSumWrap>
      </TopWrap>

      <BodyWrap>
        {filteredList &&
          filteredList.map((list, id) => {
            return (
              <div key={list.id}>
                <Hr />
                <EventWrap>
                  <WhereToUseWrap>
                    <WhereToUseType>
                      {list.type === 0 && "농산물 판매"}
                      {list.type === 1 && "정부보조금"}
                      {list.type === 2 && "기타수입"}
                      {list.type === 3 && "비료"}
                      {list.type === 4 && "종자/종묘"}
                      {list.type === 5 && "농약"}
                      {list.type === 6 && "농기계"}
                      {list.type === 7 && "기타 농자재"}
                      {list.type === 8 && "유통비 및 판매 경비"}
                      {list.type === 9 && "고용노동비"}
                      {list.type === 10 && "임차료"}
                      {list.type === 11 && "수도광열비"}
                      {list.type === 12 && "기타 지출"}
                    </WhereToUseType>
                    <MemoT>{list.memo}</MemoT>
                  </WhereToUseWrap>

                  <Price category={list.category}>
                    {list.category === "수입"
                      ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                        "+" +
                        String(list.price).replace(
                          /(\d)(?=(?:\d{3})+(?!\d))/g,
                          "$1,"
                        )
                      : "-" +
                        String(list.price).replace(
                          /(\d)(?=(?:\d{3})+(?!\d))/g,
                          "$1,"
                        )}
                  </Price>
                </EventWrap>
              </div>
            );
          })}
      </BodyWrap>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 6px 0px;
`;

const PriceSumWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PriceSumNumIn = styled.span`
  font-size: 11px;
  color: #2399dc;
`;

const PriceSumNumEx = styled.span`
  font-size: 11px;
  color: #eb3333;
  margin-left: 8px;
`;

const ListNum = styled.span`
  color: #aaa;
`;

const EventWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BodyWrap = styled.div`
  display: flex;
  flex-direction: column;
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
  font-size: 8px;
  color: #616161;
`;

const MemoT = styled.span`
  font-size: 10px;
  margin-left: 4px;
`;

const Price = styled.span`
  font-size: 14px;
  color: ${(props) => (props.category === "수입" ? "#2399DC" : "#EB3333")};
`;

export default EventModal;
