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

  const [todo, setTodo] = useState("");
  const [checkedInputs, setCheckedInputs] = useState("");
  const [checkedCrops, setCheckedCrops] = useState("");
  const [cropTodo, setCropTodo] = useState("");
  const [work, setWork] = useState("");
  const [memo, setMemo] = useState("");
  const [workDate, setWorkDate] = useState(new Date());
  const [myTitle, setMyTitle] = useState("");

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
  const inputTime = (e) => {
    props.setWorkTime(e.target.value);
  };

  //console.log(memo)
  //console.log(cropTodo, startDateFormat, endDateFormat, memo);

  return (
    <TodoContentWrap>
      <CategoryBigWrap>
        <TitleInput
          onChange={(e) => {
            setMyTitle(e.target.value);
            props.setTitle(e.target.value);
          }}
        />
      </CategoryBigWrap>
      <CategoryBigWrap>
        <SmallTitle>작물</SmallTitle>
        <CategoryWrap>
          {myCropsList !== undefined
            ? myCropsList.map((list) => {
                return (
                  <Label key={list.id}>
                    <FormCheckLeft
                      type="radio"
                      id={list.id}
                      name="radioButton"
                      onChange={changeRadioCrops}
                      value={checkedCrops}
                    />
                    <FormCheckText>{list.name}</FormCheckText>
                  </Label>
                );
              })
            : null}
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
            minDate={new Date()} //오늘보다 이전 날짜는 선택 못하게
            dateFormat="yyyy-MM-dd" // 시간 포맷 변경
            locale={ko} // 한글로 변경
            //inline//달력 보이게
          />
        </DatePickers>
      </CategoryBigWrap>
      <CategoryBigWrap>
        <SmallTitle className="calender">작업시간</SmallTitle>
        <TimeContent>
          <TimeInput onChange={inputTime} placeholder="시간으로 입력해주세요" />{" "}
          <p>시간</p>
        </TimeContent>
      </CategoryBigWrap>
      <CategoryBigWrap>
        <SmallTitle className="work">분류</SmallTitle>
        <WorkCategoryWrap>
          <Label>
            <FormCheckLeftWork
              type="radio"
              id="비료뿌리기"
              name="radioButtonWork"
              onChange={changeRadioWork}
              value={checkedInputs}
            />
            <FormCheckTextWork>비료뿌리기</FormCheckTextWork>
          </Label>
          <Label>
            <FormCheckLeftWork
              type="radio"
              id="농약치기"
              name="radioButtonWork"
              onChange={changeRadioWork}
              value={checkedInputs}
            />
            <FormCheckTextWork>농약치기</FormCheckTextWork>
          </Label>
          <Label>
            <FormCheckLeftWork
              type="radio"
              id="수확"
              name="radioButtonWork"
              onChange={changeRadioWork}
              value={checkedInputs}
            />
            <FormCheckTextWork>수확</FormCheckTextWork>
          </Label>
          {/* <Label>
                  <FormCheckLeftWork
                    type="radio"
                    id="기타"
                    name="radioButton"
                    onChange={changeRadioWork}
                    value={checkedInputs}
                  />
                <FormCheckText>기타</FormCheckText>
              </Label> */}
        </WorkCategoryWrap>
      </CategoryBigWrap>
      <CategoryBigWrap>
        <SmallTitle className="todo">작업내용</SmallTitle>
        <TodoInput
          type="text"
          ref={inputRef}
          //defaultValue={memo}
          onChange={(e) => {
            props.setMemo(e.target.value);
          }}
          placeholder="일정을 기록해주세요"
        />
      </CategoryBigWrap>
    </TodoContentWrap>
  );
};

const TodoContentWrap = styled.div`
  padding: 30px;
  width: 93%;
  height: 520px;
  background-color: #fff;
`;
const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const TitleInput = styled.input`
  height: 30px;
  width: 500px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom: 1px solid #bfbfbf;
  font-size: 36px;
  padding: 10px;
`;

const CategoryWrap = styled.div`
  margin-top: 10px;
  display: flex;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const FakeCropContent = styled.div`
  display: inline-block;
  border: 1px solid #bfbfbf;
  font-color: #616161;
  font-size: 14px;
  width: auto;
  height: auto;
  padding: 4px 12px;
  border-radius: 13px;
  margin-right: 5px;
`;

const DatePickers = styled.div`
  margin-top: 3px;
  .startDatePicker {
    font-size: 24px;
    background-color: transparent;
    color: black;
    border: none;
  }
`;
const TimeInput = styled.input`
  width: 150px;
  padding: 3px;
`;
const TimeContent = styled.div`
  display: flex;
`;

const WorkCategoryWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

const FormCheckText = styled.span`
  width: 80px;
  height: 30px;
  padding-bottom: 4px;
  border-radius: 20px;
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

const FormCheckTextWork = styled.span`
  width: 80px;
  height: 30px;
  padding-bottom: 4px;
  border-radius: 20px;
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

const FormCheckLeftWork = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckTextWork} {
    background: black;
    color: white;
  }
  display: none;
`;

const TodoInput = styled.textarea`
  width: 80%;
  height: 10em;
  resize: none;
  font-size: 15px;
  border: 1px solid #bfbfbf;
  // border-bottom: 1px solid black;
  padding-right: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  &::placeholder {
    color: #ddd;
    font-size: 15px;
    padding: 10px;
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
