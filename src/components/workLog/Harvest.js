import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Record = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [hRecord, setHRecord] = useState();
  // const hRecordNumber = Number(hRecord);

  const handleAction = (e) => {
    props.setHarvest(e.target.value);
  };

  // useEffect(() => {
  //   props.setHarvest(hRecordNumber);
  // }, [handleAction]);

  //console.log(hRecord)
  return (
    <RecordContentWrap>
      <SmallTitle>수확량 기록하기</SmallTitle>
      <CategoryBigWrap>
        <InnerSet>
          <InputBox
            className="quantity"
            type="text"
            name="quantity"
            onChange={handleAction}
          />
          <p className="kg">kg</p>
        </InnerSet>
      </CategoryBigWrap>
    </RecordContentWrap>
  );
};

const RecordContentWrap = styled.div`
  width: 93%;
  height: 50px;
  background-color: #fff;
  margin-top: 20px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const CategoryBigWrap = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.input`
  width: 40px;
  font-size: 14px;
  border-top: none;
  border-right: none;
  border-left: none;
`;

const InnerSet = styled.div`
  display: flex;
  align-items: center;
  .kg {
    font-size: 14px;
  }
`;

export default Record;
