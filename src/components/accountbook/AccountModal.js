import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteAccountDB, getAccountListDB } from "../../redux/modules/account";
// 날짜 선택 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const AccountModal = ({
  isOpen,
  toggleModal,
  accountId,
  currentAccount_list,
}) => {
  const dispatch = useDispatch();
  const account = currentAccount_list.find((list) => list.id === accountId);
  const [openEdit, setOpenEdit] = useState(false);
  const [date, setDate] = useState(new Date(account.date));
  const [checkedInputs, setCheckedInputs] = useState("");

  function toggleEditModal() {
    setOpenEdit(!openEdit);
  }

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Wrap>
        <TopWrap>
          <Day>
            {openEdit ? (
              <SDatePicker
                selected={date}
                onChange={(date) => {
                  setDate(date);
                }}
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                // minDate={new Date()}
                value={date}
              />
            ) : (
              account.date
            )}
          </Day>
          <div>
            <Btn onClick={toggleEditModal}>수정</Btn>
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

        <CategoryBigWrap>
          <span>분류</span>
          <CategoryWrap>
            <LabelS>
              <FormCheckLeft
                type="radio"
                id="수입"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>수입</FormCheckText>
            </LabelS>
            <LabelS>
              <FormCheckLeft
                type="radio"
                id="지출"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>지출</FormCheckText>
            </LabelS>
          </CategoryWrap>
        </CategoryBigWrap>

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
            {openEdit ? (
              <input defaultValue={account.price} />
            ) : account.category === "수입" ? (
              // 수입이면 + , 지출이면 - 붙이고 숫자에 콤마넣기
              "+" +
              String(account.price).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
            ) : (
              "-" +
              String(account.price).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
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

const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const FormCheckText = styled.span`
  width: 60px;
  height: 30px;
  padding-bottom: 4px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;

  cursor: pointer;
  color: black;
  &:hover {
    background-color: black;
    color: white;
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
    background: black;
    color: white;
  }
  display: none;
`;

const LabelS = styled.label``;

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

const SDatePicker = styled(DatePicker)`
  width: 180px;
  height: 26px;
  border-radius: 10px;
  border: 1px solid black;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
export default AccountModal;
