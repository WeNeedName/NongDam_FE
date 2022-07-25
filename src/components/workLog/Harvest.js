import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Record = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 숫자만 입력
  function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, "");
  }

  function inputNumberFormat(e) {
    e.target.value = uncomma(e.target.value);
    props.setWorkTime(e.target.value);
  }

  const handleAction = (e) => {
    props.setHarvest(e.target.value);
  };

  //console.log(hRecord)
  return (
    <RecordContentWrap>
      <SmallTitle>수확량</SmallTitle>
      <CategoryBigWrap>
        <InnerSet>
          <InputBox
            className="quantity"
            type="text"
            maxLength="8"
            onChange={(e) => {
              inputNumberFormat(e);
              handleAction();
            }}
            name="quantity"
            placeholder="수확량"
          />
          <p className="kg">kg</p>
        </InnerSet>
      </CategoryBigWrap>
    </RecordContentWrap>
  );
};

const RecordContentWrap = styled.div`
  width: 93%;
  background-color: #fff;
  margin-top: 20px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 4px 0px;
`;

const InputBox = styled.input`
  width: 100px;
  height: 20px;
  padding: 4px 10px;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  border-radius: 6px;
  margin-right: 6px;
  &:focus {
    outline: none;
  }
`;

const InnerSet = styled.div`
  display: flex;
  align-items: center;
  .kg {
    font-size: 14px;
    color: #616161;
  }
`;

export default Record;
