import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountDB, getAccountListDB } from "../../redux/modules/account";
// 컴포넌트
import AccountModal from "./AccountModal";

const AccountWeek = () => {
  const dispatch = useDispatch();

  const [checkedInputs, setCheckedInputs] = useState("전체");
  const [render, setRender] = useState(false);
  const [accountId, setAccountId] = useState(null);
  // 장부내역 상세 모달 열기
  const [isOpen, setOpen] = useState(false);

  function toggleModal(id) {
    setOpen(!isOpen);
    setAccountId(id);
  }

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  const currentAccount_list = useSelector(
    (state) => state.account.currentAccount
  );

  // 항목(전체, 수입, 지출) 필터링
  const filteredCategory =
    currentAccount_list !== undefined &&
    currentAccount_list.filter((v) => v.category === checkedInputs);
  console.log(currentAccount_list);
  return (
    <Wrap>
      <CategoryWrap>
        <Label>
          <FormCheckLeft
            type="radio"
            id="전체"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
            defaultChecked
          />
          <FormCheckText>전체</FormCheckText>
        </Label>
        <Label>
          <FormCheckLeft
            type="radio"
            id="수입"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>수입</FormCheckText>
        </Label>
        <Label>
          <FormCheckLeft
            type="radio"
            id="지출"
            name="radioButton"
            onChange={changeRadio}
            value={checkedInputs}
          />
          <FormCheckText>지출</FormCheckText>
        </Label>
      </CategoryWrap>
      {currentAccount_list !== undefined && checkedInputs === "전체"
        ? currentAccount_list.map((list, accountId) => {
            return (
              <AccountBox
                key={list.id}
                onClick={() => {
                  toggleModal(list.id);
                }}
              >
                <div>
                  <Day>{list.date}</Day>
                </div>
                <span>사용처</span>
                <BottomWrap>
                  <button>
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
                  </button>

                  <span>
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
                  </span>
                </BottomWrap>
              </AccountBox>
            );
          })
        : currentAccount_list !== undefined &&
          filteredCategory.map((list, id) => {
            return (
              <AccountBox
                key={list.id}
                onClick={() => {
                  toggleModal(list.id);
                }}
              >
                <div>
                  <Day>{list.date}</Day>
                </div>
                <span>사용처</span>
                <BottomWrap>
                  <button>
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
                  </button>

                  <span>
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
                  </span>
                </BottomWrap>
              </AccountBox>
            );
          })}
      {isOpen && (
        <AccountModal
          isOpen={isOpen}
          toggleModal={toggleModal}
          accountId={accountId}
          currentAccount_list={currentAccount_list}
        />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 35%;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ddd;
  padding: 40px 0px;
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
  margin-right: 10px;
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

const Label = styled.label``;

const AccountBox = styled.div`
  width: 300px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  margin: 10px 0px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Day = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const BottomWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 6px;
`;

export default AccountWeek;
