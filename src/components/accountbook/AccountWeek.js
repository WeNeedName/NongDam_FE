import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountDB } from "../../redux/modules/account";

const AccountWeek = () => {
  const dispatch = useDispatch();

  const [checkedInputs, setCheckedInputs] = useState("전체");
  //   const [checkedInputs, setCheckedInputs] = useState("전체");
  console.log(checkedInputs);
  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };

  const currentAccount_list = useSelector(
    (state) => state.account.currentAccount
  );
  console.log(currentAccount_list);

  // 항목(전체, 수입, 지출) 필터링
  const filteredCategory =
    currentAccount_list !== undefined &&
    currentAccount_list.filter((v) => v.category === checkedInputs);

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
              <AccountBox key={list.id}>
                <div>
                  <Day>{list.date}</Day>
                  <button
                    onClick={() => {
                      dispatch(deleteAccountDB(list.id));
                    }}
                  >
                    삭제
                  </button>
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
                      ? "+" + list.price
                      : "-" + list.price}
                  </span>
                </BottomWrap>
              </AccountBox>
            );
          })
        : currentAccount_list !== undefined &&
          filteredCategory.map((list, id) => {
            return (
              <AccountBox key={list.id}>
                <div>
                  <Day>{list.date}</Day>
                  <button
                    onClick={() => {
                      dispatch(deleteAccountDB(list.id));
                    }}
                  >
                    삭제
                  </button>
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
                      ? "+" + list.price
                      : "-" + list.price}
                  </span>
                </BottomWrap>
              </AccountBox>
            );
          })}
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
