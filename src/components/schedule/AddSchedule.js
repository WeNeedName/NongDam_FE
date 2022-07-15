import React, { startTransition, useEffect, useState, useRef } from "react";
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

import Swal from "sweetalert2";


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

  const memoRef= useRef()

  const changeRadioWork = (e) => {
    if (e.target.checked) {
      setMemo(e.target.id);  
      memoRef.current.value = e.target.id;    
    }
  };
  //console.log(memo)
  // const changeRadioWorkNone = (e) => {
  //   if (e.target.checked) {
  //     setMemo("");      
  //   }
  // };
   console.log(checkedCrops)
  const changeRadioCrops = (e) => {
    if (e.target.checked) {
      setCheckedCrops(e.target.id);
    }
  };

  const addSchedule = () => {
   dispatch(
      addScheduleDB({
        cropId: checkedCrops,
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
  console.log(checkedCrops, startDateFormat, endDateFormat, memo);
  
//console.log(myCropsList)


const [noCrop, setNoCrop] = useState()
const goMyPage = () => {navigate("/mypage")}

return (
  <>
    {myCropsList.length === 0 ? (
        <>
          <NoCropStyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}>
              <NoCropModalContent>
                <AlertMessage> 내 작물을 등록해주세요</AlertMessage> 
                <GoToMyPage
                onClick ={goMyPage}     
                >내 작물 등록하러 가기</GoToMyPage>  
              </NoCropModalContent>
          </NoCropStyledModal>
        </>
      )
    : 
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}>
      <WrapWrap>
        <TotalTitle>
            일정 기록하기
        </TotalTitle>
        <Wrap>
          <ContentWrapL className="left">
            <CropWrap>
              <SmallTitle className="crop">작물</SmallTitle>
              <CropSelectBoxWrap>
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
                }) : (null)
                      
              }
              </CropSelectBoxWrap>
            </CropWrap>
            <DateWrap>
              <SmallTitle className="startDate">시작</SmallTitle>
                <DatePicker
                  className="startDatePicker"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  minDate={new Date()} //오늘보다 이전 날짜는 선택 못하게 
                  dateFormat="yyyy.MM.dd HH:mm"// 시간 포맷 변경
                  locale={ko}// 한글로 변경
                  //inline//달력 보이게 
                />
            </DateWrap>
            <DateWrap>
            <SmallTitle className="endDate">종료</SmallTitle>
                <DatePicker
                  className="endDatePicker"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  showTimeSelect
                  minDate={startDate} //오늘보다 이전 날짜는 선택 못하게
                  dateFormat="yyyy.MM.dd HH:mm"
                  locale={ko}// 한글로 변경
                  //inline//달력 보이게 
                />
              </DateWrap>
          </ContentWrapL>
        <ContentWrapR className="right">        
          <WorkWrap>
            <SmallTitle className="work">농작업</SmallTitle>

               <WorkSelectBoxWrap>
                  <LabelWork>
                    <FormCheckLeftWork                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                    type="radio"
                    id="비료뿌리기"
                    name="radioButtonWork"
                    onChange={changeRadioWork}
                    value={checkedInputs} /> 
                    <FormCheckTextWork>비료뿌리기 </FormCheckTextWork>
                  </LabelWork>
                  <LabelWork>
                  <FormCheckLeftWork
                    type="radio"
                    id="농약치기"
                    name="radioButtonWork"
                    onChange={changeRadioWork}
                    value={checkedInputs}/> 
                    <FormCheckTextWork>농약치기</FormCheckTextWork>
                  </LabelWork>
                  <LabelWork>
                  <FormCheckLeftWork
                    type="radio"
                    id="수확"
                    name="radioButtonWork"
                    onChange={changeRadioWork}
                    value={checkedInputs}/> 
                    <FormCheckTextWork>수확</FormCheckTextWork>
                  </LabelWork>
                  {/* <LabelWork>
                  <FormCheckLeftWork
                    type="radio"
                    id="기타"
                    name="radioButtonWork"
                    onChange={changeRadioWorkNone}
                    value={checkedInputs}/> 
                    <FormCheckTextWork>기타</FormCheckTextWork>
                  </LabelWork> */}
                </WorkSelectBoxWrap>
          </WorkWrap>
        
        <CategoryBigWrap>
          <SmallTitle className="todo">작업내용</SmallTitle>
          <TodoInput
            type="text"
            ref={memoRef}
            // defaultValue={memo}
            onChange={(e)=>{
              setMemo(e.target.value)
            }}
            placeholder="일정을 기록해주세요"
          />
          </CategoryBigWrap>
      </ContentWrapR>
        </Wrap>
        <BtnWrap>
        <DoneBtn
          onClick={()=>{
            addSchedule()
            navigate("/schedule")
          }}>작성완료</DoneBtn>
        <CancelBtn
          onClick={()=>{
            toggleModal()
          }}>취소</CancelBtn>
        </BtnWrap>
      </WrapWrap>
    </StyledModal>
    }
    </>
  );

};

const StyledModal = Modal.styled`
  max-width: 600px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  @media only screen and (max-width: 760px) {
    width: 80%;
    padding: 20px;
  }
`;

const NoCropStyledModal = Modal.styled`
  max-width: 300px;
  width: 100%;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  @media only screen and (max-width: 760px) {
    width: 60%;
    padding: 20px;
  }
`;

const NoCropModalContent = styled.div`
display : flex;
flex-direction : column;
justify-content : center;
text-align : center;
align-items : center;
`


const AlertMessage = styled.div`
font-size : 24px;
font-weight : 700;
`
const GoToMyPage = styled.button`

width : 150px;
padding : 8px 0px;
border-radius : 10px;
border : none;
background-color : #22631c;
color : #fff;
font-weight : 400;
margin-top : 20px;
cursor : pointer;

`


const WrapWrap = styled.div``
const TotalTitle = styled.label`
font-size: 27px;
font-weight: 700;
display : flex;
text-align : left;
align-items : start;

`
const Wrap = styled.div`
  width: 100%;
  height: 70%;
  display: grid;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: white;
  border-radius: 20px;
  position: relative;
  grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr;
  
`;
const ContentWrapL = styled.div`
`
const ContentWrapR = styled.div``

const TodoContent = styled.div`
// padding: 0px 0px;
// width: 100vw
// height: 80vh
`

const CropWrap = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
margin-bottom : 20px;`

const SmallTitle = styled.label`
font-size: 18px;
font-weight: bold;
margin-bottom : 10px;
`
const CropSelectBoxWrap = styled.div`
display: flex;
flex-direction: row;
`

const DateWrap = styled.div`
.startDatePicker{
  width:55%;
  height:2rem;
  font-size:1.3rem;
  font-weight:bold;
  background-color:transparent;
  color:black;
  border: none;
}
.endDatePicker{
  width:55%;
  height:2rem;
  font-size:1.3rem;
  font-weight:bold;
  background-color:transparent;
  color:black;
  border: none;
}
`
    

const FormCheckText = styled.span`
  width: auto;
  height: 25px;
  padding-left : 7px;
  padding-right : 7px;
  margin-right : 4px;
  border-radius: 13px;
  background: transparent;
  border: 1px solid #BFBFBF;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
   color : #616161
  // &:hover {
  //   background-color: #BFBFBF;
  //   color: white;
  // }
`;

const FormCheckLeft = styled.input`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    background: #22631C;
    color: white;
    border: 1px solid #22631C;
    padding-left : 7px;
    padding-right : 7px;  
    margin-right : 4px;
  }
  display: none;
`;
const Label = styled.label`
`;

const FormCheckTextWork = styled.span`
  width: 50px;
  height: 25px;
  padding-left : 10px;
  padding-right : 10px;
  border-radius: 13px;
  background: transparent;
  border: 1px solid #BFBFBF;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color : #616161
  // &:hover {
  //   // background-color: #BFBFBF;
  //   // color: white;
  //   border: 1px solid #22631C;
    
  //   padding-left : 10px;
  //   padding-right : 10px;
  //   margin-right: 10px;
  // }
`;

const FormCheckLeftWork = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckTextWork} {
    background: #22631C;
    color: white;
    border: 1px solid #22631C;
    padding-left : 10px;
    padding-right : 10px;
    margin-right: 10px;
    
    
  }
  display: none;
`;




const LabelWork = styled.label`

`;


const CategoryBigWrap = styled.div`
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;

const WorkWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom : 30px;
`

const WorkSelectBoxWrap = styled.div`
display: flex;

`

const TodoInput = styled.textarea`
  width: 250px;
  height: 80px;
  font-size: 10px;
  border: 1px solid #BFBFBF;
  padding : 10px;
  border-radius: 10px;
  &::placeholder {
    color: #ddd;
    padding: 1px;
  }
`;

const BtnWrap = styled.div`
display : flex;
justify-content :flex-end;
margin-right : 18px;`

const DoneBtn = styled.button`
  
  font-size: 11px;
  width: 70px;
  height: 30px;
  background-color: #22631C;
  color: white;
  border: none;
  border-radius: 8px;
  margin-right : 10px;
  cursor : pointer;
  
  &:hover {
    opacity: 0.7;
  }
`;

const CancelBtn = styled.button`
  
  font-size: 11px;
  width: 50px;
  height: 30px;
  background-color: #fff;
  color: #616161;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  cursor : pointer;
  &:hover {
    opacity: 0.7;
  }
`;



export default AddSchedule;
