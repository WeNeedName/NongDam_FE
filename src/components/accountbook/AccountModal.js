import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteAccountDB, getAccountListDB } from "../../redux/modules/account";

const AccountModal = ({
  isOpen,
  toggleModal,
  accountId,
  currentAccount_list,
}) => {
  const dispatch = useDispatch();
  const account = currentAccount_list.find((list) => list.id === accountId);

  console.log(account);
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Wrap>
        <TopWrap>
          <Day>{account.date}</Day>
          <div>
            <Btn>수정</Btn>
            <Btn
              onClick={() => {
                const result = window.confirm(
                  "삭제하시겠습니까? 삭제한 내역은 되돌릴 수 없습니다."
                );
                if (result) {
                  dispatch(deleteAccountDB(account.id));
                  toggleModal();
                }
              }}
            >
              삭제
            </Btn>
            <Btn onClick={toggleModal}>닫기</Btn>
          </div>
        </TopWrap>
        <Label>사용처</Label>
        <BottomWrap>
          <Category>
            {account.type === 0 && "농산물 판매"}
            {account.type === 1 && "정부보조금"}
            {account.type === 2 && "기타수입"}
            {account.type === 3 && "비료"}
            {account.type === 4 && "종자/종묘"}
            {account.type === 5 && "농약"}
            {account.type === 6 && "농기계"}
            {account.type === 7 && "기타 농자재"}
            {account.type === 8 && "유통비 및 판매 경비"}
            {account.type === 9 && "고용노동비"}
            {account.type === 10 && "임차료"}
            {account.type === 11 && "수도광열비"}
            {account.type === 12 && "기타 지출"}
          </Category>
          <Price>
            {account.category === "수입"
              ? // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
                "+" +
                String(account.price).replace(
                  /(\d)(?=(?:\d{3})+(?!\d))/g,
                  "$1,"
                )
              : "-" +
                String(account.price).replace(
                  /(\d)(?=(?:\d{3})+(?!\d))/g,
                  "$1,"
                )}
          </Price>
        </BottomWrap>
        {account.memo !== "" && (
          <BottomWrap>
            <span>메모</span>
            <span>{account.memo}</span>
          </BottomWrap>
        )}
      </Wrap>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  width: 700px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Day = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const Btn = styled.button`
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid black;
  margin-left: 10px;
  padding: 4px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const Label = styled.span`
  font-size: 18px;
  margin-top: 20px;
`;

const Category = styled.span`
  font-size: 24px;
`;

const Price = styled.span`
  font-size: 30px;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

export default AccountModal;
