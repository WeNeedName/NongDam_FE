import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import MiniÇalendar from './MiniCalendar'
import {addScheduleDB} from '../../redux/modules/schedule'
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";



const AddSchedule = (props) => {
  const [todo, setTodo] = useState("");
  const [checkedInputs, setCheckedInputs] = useState("");
  const [work, setWork] = useState(null);
  const [memo, setMemo] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);
  
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartTime(start);
    setEndTime(end);
    // console.log(startTime, end)
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function inputTodo(e) {
    setTodo(e.target.value);
  }

  const changeRadio = (e) => {
    if (e.target.checked) {
      setWork(e.target.id);
    }
  };

 


  console.log( memo, work);

const addSchedule = (crop, startTime, endTime, memo, work) => {
  dispatch(
    addScheduleDB({
      crop: crop,
      startTime: startTime,
      endTime: endTime,
      toDo: (memo || work),
    })
  )
}
  console.log(startTime, endTime, memo, work);


return (
    <Back>
      <Wrap>
        <TotalTitle>
            작업일정등록하기
        </TotalTitle>
        <ClearBtn
          onClick={() => {
            navigate("/schedule");
          }}>
          x
        </ClearBtn>
        <TodoContent>
        <CropsBigWrap>
          <SmallTitle>분류</SmallTitle>
          <CropsWrap>
            <Label>
              <FormCheckLeft
                type="radio"
                id="복숭아"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>복숭아</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="수박"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>수박</FormCheckText>
            </Label>
          </CropsWrap>
        </CropsBigWrap>
        <CalenderBigWrap>
            <SmallTitle className="calender">날짜선택</SmallTitle>
            <DatePicker
        selected={startTime}
        onChange={onChange}
        startDate={startTime}
        endDate={endTime}
        selectsRange
        inline
          />
            
           
        </CalenderBigWrap>
        <CategoryBigWrap>
          <span>분류</span>
          <CategoryWrap>
            <Label>
              <FormCheckLeft
                type="radio"
                id="비료뿌리기"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>비료뿌리기</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="농약치기"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>농약치기</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="수확"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>수확</FormCheckText>
              <Label>
              <FormCheckLeft
                type="radio"
                id="기타"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <FormCheckText>기타</FormCheckText>
            </Label>
            </Label>
          </CategoryWrap>
        </CategoryBigWrap>

        {/* <WorkBigWrap>
            <SmallTitle className="work">농작업분류</SmallTitle>
            <WorksWrap>
            <Work>
              <WorkRadio
                type="radio"
                id="비료뿌리기"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <WorkRadioText>비료뿌리기</WorkRadioText>
            </Work>
            <Work>
              <WorkRadio
                type="radio"
                id="농약치기"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
                
              />
              <WorkRadioText>농약치기</WorkRadioText>
            </Work>
            <Work>
              <WorkRadio
                type="radio"
                id="수확"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <WorkRadioText>수확</WorkRadioText>
            </Work>
            <Work>
              <WorkRadio
                type="radio"
                id="기타"
                name="radioButton"
                onChange={changeRadio}
                value={checkedInputs}
              />
              <WorkRadioText>기타</WorkRadioText>
            </Work>
          </WorksWrap>
        </WorkBigWrap> */}

          <TodoWrap>
        <SmallTitle className="todo">작업내용</SmallTitle>
        <TodoInput
          type="text"
          onChange={(e) => {
           setMemo(e.target.value)
          }}
          placeholder="일정을 기록해주세요"
        />
        </TodoWrap>
        </TodoContent>  
        <DoneBtn
          onClick={()=>{
            addSchedule()
          }}>작성완료</DoneBtn>
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
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  position: relative;
  padding: -10px;
`;
const TodoContent = styled.div`
padding: 0px 0px;
width: 500px
`


const SmallTitle = styled.label`
font-size: 1.3em;
font-weight: bold;
`

const TotalTitle = styled.label`
font-size: 2rem;
font-weight: bold;

`
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
//작물 스타일드컴포넌트
const CropsBigWrap = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 10px;
  

`;

const CropsBigWrapSub = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  
`;

const CropsWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
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


const CalenderBigWrap = styled.div`
width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 10px;

`;
//작업대분류 스타일드컴포넌트
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


const WorkBigWrap = styled.div`
width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 10px;

`
const WorksWrap = styled.div`
display: flex;
  flex-direction: row;
  margin-left: 20px;
`

const Work = styled.label``
const WorkRadio= styled.input.attrs({ type: "radio" })`
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
const WorkRadioText = styled.span`
  width: 70px;
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



//작업내용 스타일드 컴포넌트
const TodoWrap = styled.div``
const TodoInput = styled.textarea`
  width: 400px;
  font-size: 20px;
  border: 1px solid black;
//   border-bottom: 1px solid black;
  padding-right: 30px;
  margin-bottom: 20px;
  &::placeholder {
    color: #ddd;
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

export default AddSchedule;
