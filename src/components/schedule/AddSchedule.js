import React, { startTransition, useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {addScheduleDB} from '../../redux/modules/schedule'

//달력
import DatePicker from "react-datepicker";
import { addDays } from "date-fns"
import { ko } from "date-fns/esm/locale";
import moment from "moment";

const AddSchedule = ({isOpen, toggleModal, scheduleId}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const [todo, setTodo] = useState("");
  const [checkedInputs, setCheckedInputs] = useState("");
  const [checkedCrops, setCheckedCrops] = useState("");
  const [cropTodo, setCropTodo] = useState("")
  const [work, setWork] = useState("");
  const [memo, setMemo] = useState("");
  // const [startTime, setStartTime] = useState(new Date());
  // const [endTime, setEndTime] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  const myCropsList = useSelector((state) => state.users.user?.crops)

  const changeRadioWork = (e) => {
    if (e.target.checked) {
      setMemo(e.target.id);      
    }
  };
  console.log(checkedCrops)
  const changeRadioCrops = (e) => {
    if (e.target.checked) {
      setCropTodo(e.target.id);
    }
  };

  const addSchedule = () => {
   dispatch(
      addScheduleDB({
        cropId: cropTodo,
        startTime: startDateFormat,
        endTime: endDateFormat,
        toDo: memo
      })
    ).then(
      toggleModal()
      );
  }
  const startDateFormat = moment(startDate).format("YYYY-MM-DD HH:mm")
  const endDateFormat = moment(endDate).format("YYYY-MM-DD HH:mm")
  //console.log(cropTodo, startDateFormat, endDateFormat, memo);
  
console.log(myCropsList)
//console.log(checkedCrops)
return (
    //<Back>
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Wrap>
        <TotalTitle>
            작업일정등록하기
        </TotalTitle>
        <TodoContent>
        <CategoryBigWrap>
          <SmallTitle>작물종류</SmallTitle>
          <CategoryWrap>
            {myCropsList !== undefined ? 
              myCropsList.map((list)=>{
              return(
                <Label
                key={list.id}>
                <FormCheckLeft
                  type="radio"
                  id={list.id}
                  name="radioButton"
                  onChange={changeRadioCrops}
                  value={checkedCrops}
                />
                <FormCheckText>{list.name}</FormCheckText>
              </Label>
              )
            }) : null 
          }
          </CategoryWrap>
        </CategoryBigWrap>
        <CategoryBigWrap>
              <SmallTitle className="calender">날짜선택</SmallTitle>
          <DatePickers>
            <DatePicker
                className="startDatePicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                minDate={new Date()} //오늘보다 이전 날짜는 선택 못하게 
                dateFormat="yyyy-MM-dd HH:mm"// 시간 포맷 변경
                locale={ko}// 한글로 변경
                //inline//달력 보이게 
            />
            <DatePicker
                className="endDatePicker"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                minDate={startDate} //오늘보다 이전 날짜는 선택 못하게
                dateFormat="yyyy-MM-dd HH:mm"
                locale={ko}// 한글로 변경
                //inline//달력 보이게 
            />
          </DatePickers>
        </CategoryBigWrap>
        <CategoryBigWrap>
        <SmallTitle className="work">분류</SmallTitle>
          <CategoryWrap>
            <Label>
              <FormCheckLeft
                type="radio"
                id="비료뿌리기"
                name="radioButton"
                onChange={changeRadioWork}
                value={checkedInputs}
              />
              <FormCheckText>비료뿌리기</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="농약치기"
                name="radioButton"
                onChange={changeRadioWork}
                value={checkedInputs}
              />
              <FormCheckText>농약치기</FormCheckText>
            </Label>
            <Label>
              <FormCheckLeft
                type="radio"
                id="수확"
                name="radioButton"
                onChange={changeRadioWork}
                value={checkedInputs}
              />
              <FormCheckText>수확</FormCheckText>
              </Label>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="기타"
                  name="radioButton"
                  onChange={changeRadioWork}
                  value={checkedInputs}
                />
              <FormCheckText>기타</FormCheckText>
            </Label>
           
          </CategoryWrap>
        </CategoryBigWrap>

          <CategoryBigWrap>
        <SmallTitle className="todo">작업내용</SmallTitle>
        <TodoInput
          type="text"
          defaultValue={memo}
          onChange={(e)=>{
            setMemo(e.target.value)
          }}
          placeholder="일정을 기록해주세요"
        />
        </CategoryBigWrap>
        </TodoContent>  
        <DoneBtn
          onClick={()=>{
            addSchedule()
            navigate("/schedule")
          }}>작성완료</DoneBtn>
      </Wrap>
    </StyledModal>
  );
};

const StyledModal = Modal.styled`
  width: 50%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const Wrap = styled.div`
  width: 100%;
  height: 70%;
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
width: 100vw
height: 80vh
`
const SmallTitle = styled.label`
font-size: 1.3em;
font-weight: bold;
`

const TotalTitle = styled.label`
font-size: 2rem;
font-weight: bold;

`

const DatePickers = styled.div`
.startDatePicker{
   width:50%;
   height:2rem;
   font-size:1.3rem;
   font-weight:bold;
   background-color:transparent;
   color:black;
   border: none;
}
.endDatePicker{
  width:50%;
  height:2rem;
  font-size:1.3rem;
  font-weight:bold;
  background-color:transparent;
  color:black;
  border: none;
}
`    

const FormCheckText = styled.span`
  width: 80px;
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

const Label = styled.label`

`;


const CalenderBigWrap = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: start;
  margin-top: 10px;

`;

const CategoryBigWrap = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const CategoryBigWrapSub = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;
const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center
  
`;





//작업내용 스타일드 컴포넌트

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
