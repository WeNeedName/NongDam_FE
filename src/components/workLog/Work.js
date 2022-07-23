import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInfoDB } from "../../redux/modules/users";
//import {logOutDB} from '../redux/modules/users'

//달력
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { ko } from "date-fns/esm/locale";
import moment from "moment";

const Work = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [checkedInputs, setCheckedInputs] = useState("");
  const [checkedCrop, setCheckedCrop] = useState("");
  const [cropTodo, setCropTodo] = useState("");
  const [work, setWork] = useState("");
  const [memo, setMemo] = useState("");
  const [workDate, setWorkDate] = useState(new Date());

  //유저가 선택한 작물 불러오기
  useEffect(() => {
    dispatch(getInfoDB());
  }, []);
  const myCropsList = useSelector((state) => state.users.user?.crops);
  // console.log(myCropsList)

  const changeRadioCrops = (e) => {
    if (e.target.checked) {
      props.setCrop(e.target.id);
    }
  };

  const changeRadioWork = (e) => {
    if (e.target.checked) {
      setMemo(e.target.id);
      inputRef.current.value = e.target.id;
      props.setMemo(inputRef.current.value);
    }
  };
  return (
    <TodoContentWrap>
      <CategoryBigWrap>
        <TitleInput
          placeholder="제목을 작성해주세요"
          onChange={(e) => {
            props.setTitle(e.target.value);
          }}
        />
      </CategoryBigWrap>
      <CategoryBigWrap>
        <SmallTitle>작물</SmallTitle>
        <CategoryWrap>
          {myCropsList !== undefined &&
            myCropsList.map((list) => {
              return (
                <Label key={list.id}>
                  <FormCheckLeft
                    type="radio"
                    id={list.id}
                    name="radioButton"
                    onChange={changeRadioCrops}
                    value={checkedCrop}
                  />
                  <FormCheckText>{list.type}</FormCheckText>
                </Label>
              );
            })}
        </CategoryWrap>
      </CategoryBigWrap>
      <CategoryBigWrap>
        <SmallTitle className="calender">작업 날짜</SmallTitle>
        <DatePickers>
          <DatePicker
            className="startDatePicker"
            selected={workDate}
            onChange={(date) => {
              setWorkDate(date);
              props.setDate(date);
            }}
            dateFormat="yyyy-MM-dd" // 시간 포맷 변경
            locale={ko} // 한글로 변경
            //inline//달력 보이게
          />
        </DatePickers>
      </CategoryBigWrap>
      <CategoryBigWrap>
        {props.isEdit ? null : (
          <>
            <SmallTitle className="calender">작업시간</SmallTitle>
            <TimeContent>
              <TimeInput
                onChange={(e) => {
                  props.setWorkTime(e.target.value);
                }}
              />
              <p className="inputTitle">시간</p>
            </TimeContent>
          </>
        )}
      </CategoryBigWrap>
      {props.isEdit ? null : (
        <CategoryBigWrap>
          <SmallTitle className="todo">작업내용</SmallTitle>
          <TodoInput
            type="text"
            //defaultValue={memo}
            onChange={(e) => {
              props.setMemo(e.target.value);
            }}
          />
        </CategoryBigWrap>
      )}
    </TodoContentWrap>
  );
};

const TodoContentWrap = styled.div`
  padding: 0px;
  width: 93%;
  height: auto;
  background-color: #fff;
`;
const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 25px;
`;
const TitleInput = styled.input`
  height: 30px;
  width: 500px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid #bfbfbf;
  font-size: 30px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CategoryWrap = styled.div`
  display: flex;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const FormCheckText = styled.span`
  width: auto;
  height: auto;
  font-size: 14px;
  padding: 5px 11px;
  margin-top: 5px;
  border-radius: 15px;
  background: transparent;
  border: 1px solid #bfbfbf;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color: #616161;
  &:hover {
    opacity: 0.7;
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
    opacity: 0.7;
  }
  display: none;
`;

const Label = styled.label``;

const DatePickers = styled.div`
  margin-top: 3px;
  .startDatePicker {
    font-size: 24px;
    background-color: transparent;
    color: black;
    border: none;
  }
`;
const TimeContent = styled.div`
  display: flex;
  align-items: center;
  .inputTitle {
    font-size: 14px;
  }
`;
const TimeInput = styled.input`
  width: 25px;
  padding: 3px;
  border-top: none;
  border-left: none;
  border-right: none;
  font-size: 14px;
`;

const TodoInput = styled.textarea`
  width: 80%;
  height: 10em;
  resize: none;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  margin-top: 5px;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 8px;
  &::placeholder {
    color: #ddd;
    font-size: 14px;
  }
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

export default Work;
