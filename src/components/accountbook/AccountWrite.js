import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const AccountWrite = () => {
  const [price, setPrice] = useState(0);
  const [checkedInputs, setCheckedInputs] = useState("");
  const [category, setCategory] = useState(null);
  const [memo, setMemo] = useState("");

  // 숫자 콤마넣기
  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
  }

  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    setPrice(e.target.value);
    e.target.value = comma(uncomma(e.target.value));
  }
  // 콤마제거한 숫자
  const realPrice = Number(String(price).split(",").join(""));

  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };
  console.log(realPrice, checkedInputs, category, memo);
  return (
    <Back>
      <Wrap>
        <PriceInput
          type="text"
          maxLength="12"
          onChange={(e) => {
            inputNumberFormat(e);
          }}
          placeholder="0원"
        />
        <ClearBtn
          onClick={() => {
            setPrice(0);
          }}
        >
          x
        </ClearBtn>

        <CategoryBigWrap>
          <span>분류</span>
          <CategoryWrap>
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
        </CategoryBigWrap>

        <CategoryBigWrapSub>
          <div>
            <span>품목</span>
            {checkedInputs === "" && (
              <Selec onChange={(e) => setCategory(e.target.value)}>
                <option value="">분류을 먼저 선택해주세요</option>{" "}
              </Selec>
            )}
            {checkedInputs === "수입" && (
              <Selec onChange={(e) => setCategory(e.target.value)}>
                <option value="">품목을 선택해주세요</option>
                <option value="농산물 판매">농산물 판매</option>
                <option value="정부보조금">정부보조금</option>
                <option value="기타수입">기타수입</option>
              </Selec>
            )}

            {checkedInputs === "지출" && (
              <Selec onChange={(e) => setCategory(e.target.value)}>
                <option value="">품목을 선택해주세요</option>
                <option value="비료">비료</option>
                <option value="종자/종묘">종자/종묘</option>
                <option value="농약">농약</option>
                <option value="농기계">농기계</option>
                <option value="기타 농자재">기타 농자재</option>
                <option value="유통비 및 판매 경비">유통비 및 판매 경비</option>
                <option value="고용노동비">고용노동비</option>
                <option value="임차료">임차료</option>
                <option value="수도광열비">수도광열비</option>
                <option value="기타 지출">기타 지출</option>
              </Selec>
            )}
          </div>
        </CategoryBigWrapSub>
        <CategoryBigWrapSub>
          <span>메모</span>
          <MemoInput
            onChange={(e) => setMemo(e.target.value)}
            placeholder="내용을 여기에 입력하세요"
          />
        </CategoryBigWrapSub>
        <DoneBtn>작성완료</DoneBtn>
      </Wrap>
    </Back>
  );
};

const Back = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrap = styled.form`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  position: relative;
`;

const PriceInput = styled.input`
  width: 400px;
  font-size: 20px;
  border: none;
  border-bottom: 1px solid black;
  padding-right: 30px;
  margin-bottom: 20px;
  &::placeholder {
    color: #ddd;
  }
`;

const ClearBtn = styled.button`
  display: inline-block;
  font-size: 20px;
  width: 30px;
  position: absolute;
  right: 110px;
  top: 22%;
  transform: translatey(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CategoryBigWrap = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const CategoryBigWrapSub = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
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

const Selec = styled.select`
  margin-left: 20px;
  width: 170px;
  background-color: white;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding-left: 10px;
`;

const MemoInput = styled.input`
  margin-left: 20px;
`;

const DoneBtn = styled.button`
  margin-top: 30px;
  width: 300px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

export default AccountWrite;
