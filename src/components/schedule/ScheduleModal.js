import React, { useEffect, useState, useRef } from "react";
import ReactModal from "react-modal";
import Modal from "styled-react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteScheduleDB, editScheduleDB } from "../../redux/modules/schedule";
// 날짜 선택 라이브러리
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
// 날짜 라이브러리
import moment from "moment";
import "moment/locale/ko";
import { startOfToday } from "date-fns";

const ScheduleModal = ({
  isOpen,
  toggleModal,
  scheduleId,
  currentScheduleList,
  
}) => {
  const ref=useRef();
  const inputRef=useRef();
  const memoRef=useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schedule = currentScheduleList.find((list) => list.id === scheduleId);
  const myCropsList = useSelector((state) => state.users.user?.crops)

  // console.log(myCropsList)
  // console.log(schedule.cropId)

  const [openEdit, setOpenEdit] = useState(false);
  const [startTime, setStartTime] = useState(new Date(schedule.startTime));
  const [endTime, setEndTime] = useState(new Date(schedule.endTime));
  const [toDo, setToDo] = useState(schedule.toDo);
  
  const [newCrop, setNewCrop] = useState("");
  //const [cropToDo, setCropToDo] = useState("")
  const [checkedInputs, setCheckedInputs] = useState("");
  const [checkedWork, setCheckedWork] = useState("");
  const [checkedCrops, setCheckedCrops] = useState(schedule.cropId);
    
  function toggleEditModal() {
    setOpenEdit(!openEdit);
  }
  const changeRadioCrops = (e) => {
    if (e.target.checked) {
      setCheckedCrops(e.target.id);
    }
  };
  const changeRadioWork = (e) => {
    if (e.target.checked) {
      setToDo(e.target.id);  
      memoRef.current.value=e.target.id    
       
    }
  };
  const changeRadioWorkNone = (e) => {
    if (e.target.checked) {
      setToDo("");      
    }
  };
  console.log(toDo)
  // date 형식 변경
  const selecStartTime = moment(startTime).format("YYYY-MM-DD");
  const selecEndTime = moment(endTime).format("YYYY-MM-DD");
  console.log(checkedCrops)

  const editSchedule = () => {
    const id = schedule.id;
    const data = {
      cropId: checkedCrops,
      startTime: startTimeFormat,
      endTime: endTimeFormat,
      toDo: toDo,
    };
    console.log(id, data)
    dispatch(editScheduleDB(id, data)).then(() => {
      toggleModal();
    });
  };
  const startTimeFormat = moment(startTime).format("YYYY-MM-DD HH:mm")
  const endTimeFormat = moment(endTime).format("YYYY-MM-DD HH:mm")
  console.log(checkedCrops, startTimeFormat, endTimeFormat, toDo)


  
  return (
      
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <WrapWrap>
      {openEdit ? (
        <TotalTitle> 일정 수정</TotalTitle>)  
          : ( <TotalTitle>일정 확인</TotalTitle>)}
        <Wrap>
          <LeftWrap>
            <CropWrap>
            <SmallTitle>작물</SmallTitle>
              {openEdit ? 
                (<>
                      <CropEditWrap>
                        {myCropsList !== undefined ? 
                          myCropsList.map((list,idx)=>{
                            //setCheckedCrops(.id)
                            //console.log(list)
                            return(
                              <Label
                              key={list.id}>
                                <FormCheckLeft
                                  type="radio"
                                  ref={ref}
                                  id={list.id}
                                  name="cropName"
                                  onChange={changeRadioCrops}
                                  value={checkedCrops}
                                  />
                                <FormCheckText>{list.name}</FormCheckText>
                              </Label>
                            )
                          }) : null
                        }
                      </CropEditWrap>
                  
                  </>)
               : ( <CropLoadWrap>
                      <CropName>
                      {schedule.crop}
                      </CropName>
                    </CropLoadWrap>
                 )
              }
            </CropWrap>
            <TimeWrap>
              <SmallTitle>시작</SmallTitle> 
              {openEdit ? (
                  <DatePicker
                    className="startDatePicker"
                    selected={startTime}
                    onChange={(date) => {
                      setStartTime(date)
                      inputRef.current.focus({
                        cursor: 'end'
                      })
                    }}
                    showTimeSelect
                    minDate={new Date()} //오늘보다 이전 날짜는 선택 못하게 
                    dateFormat="yyyy-MM-dd HH:mm"// 시간 포맷 변경
                    locale={ko}// 한글로 변경
                    //inline//달력 보이게 
                    />
                ) : (
                  <StartTime>
                  {schedule.startTime}
                  </StartTime>
                )}
              <SmallTitle>종료</SmallTitle> 
              {openEdit ? (
                  <DatePicker
                  className="endDatePicker"
                  selected={endTime}
                  onChange={(date) => setEndTime(date)}
                  showTimeSelect
                  minDate={startTime} //오늘보다 이전 날짜는 선택 못하게
                  dateFormat="yyyy-MM-dd HH:mm"
                  locale={ko}// 한글로 변경
                  //inline//달력 보이게 
                  />
                ) : <EndTime>
                     {schedule.endTime}
                    </EndTime>}
            </TimeWrap>
          </LeftWrap>
          <RightWrap>

          <WorkWrap>
          
              {openEdit ? (
                  <>
                    <SmallTitle>농작업</SmallTitle>
                      <WorkSelectBoxWrap>
                    <LabelWork>
                      <FormCheckLeftWork                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                        type="radio"
                        id="비료뿌리기"
                        name="radioButtonWork"
                        onChange={changeRadioWork}
                        value={checkedWork} /> 
                      <FormCheckTextWork>비료뿌리기 </FormCheckTextWork>
                    </LabelWork>
                    <LabelWork>
                    <FormCheckLeftWork
                      type="radio"
                      id="농약치기"
                      name="radioButtonWork"
                      onChange={changeRadioWork}
                      value={checkedWork}/> 
                      <FormCheckTextWork>농약치기</FormCheckTextWork>
                    </LabelWork>
                    <LabelWork>
                    <FormCheckLeftWork
                      type="radio"
                      id="수확"
                      name="radioButtonWork"
                      onChange={changeRadioWork}
                      value={checkedWork}/> 
                      <FormCheckTextWork>수확</FormCheckTextWork>
                    </LabelWork>
                  
                      </WorkSelectBoxWrap>
                      <SmallTitle>작업 내용</SmallTitle>
                      <InputMemo
                        ref={memoRef}
                        defaultValue={schedule.toDo}
                        onChange={(e) => setToDo(e.target.value)}
                        placeholder="메모를 입력해주세요"
                    />
                  </>
              ) : (
                    <>
                      <SmallTitle>작업 내용</SmallTitle>
                        {schedule.toDo !== "" ? (
                          <WorkContent>{schedule.toDo}</WorkContent>)
                        : <WorkContent></WorkContent>
                        
                        }
                    </>
                  )} 
            </WorkWrap>
            
            <BtnWrap>
                {openEdit ? (
                  <>
                    <EditBtn
                      onClick={() => {
                        editSchedule();
                        navigate("/schedule")
                      }}
                    >
                      수정완료
                    </EditBtn>
                    <Btn
                      onClick={()=>{toggleModal()}}>취소</Btn>
                    </>
                  ) : (
                    <div>
                      <Btn onClick={toggleEditModal}>수정하기</Btn>
                      <Btn
                        onClick={() => {
                          const result = window.confirm(
                            "삭제하시겠습니까? 삭제한 내역은 되돌릴 수 없습니다."
                          );
                          if (result) {
                            dispatch(deleteScheduleDB(schedule.id));
                            toggleModal();
                          }
                        }}
                      >
                        삭제하기
                      </Btn>
                      <Btn onClick={toggleModal}>닫기</Btn>
                    </div>
                  )}
            </BtnWrap>
          </RightWrap>
        </Wrap>
      </WrapWrap>
    </StyledModal>
    
  );
};

const StyledModal = Modal.styled`
  width: 700px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;
const WrapWrap = styled.div`
`
const TotalTitle = styled.label`
font-size: 27px;
font-weight: 700;
display : flex;
text-align : left;
align-items : start;
`
const Wrap = styled.div`
  display: grid;
  flex-direction: column;
  position : relative;
  grid-auto-rows : auto;
  grid-template-columns: 1fr 1fr;
`;
const LeftWrap = styled.div``

const CropWrap = styled.div``

const SmallTitle = styled.p`
font-size:18px;
font-weight: 700;
`
const Label = styled.label`
  font-size: 18px;
  
`;


const CropEditWrap = styled.div`
display : flex;

`
const FormCheckText = styled.span`
width: auto;
height: 25px;
font-size : 12px;
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
&:hover {
  background-color: #22631C;
  color: white;
  border : none;
}
`;

const FormCheckLeft = styled.input.attrs({ type: "radio" })`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
    color : #616161
  }
  &:checked + ${FormCheckText} {
    background: #22631C;
    color: white;
    border : none;
  }
  display: none;
`;

const CropLoadWrap = styled.div``

const CropName = styled.p`
width: 50px;
height: 15px;
text-align : center;
padding : 4px 4px;
font-size : 11px;
border : 1px solid #bfbfbf;
border-radius : 10px;

`
const Content = styled.p``


const TimeWrap = styled.div`
flex-direction:column;
.startDatePicker{
  width:55%;
  height:2rem;
  font-size:14px;
  
  background-color:transparent;
  color: #02113B;
  border: none;
}
.endDatePicker{
  width:55%;
  height:2rem;
  font-size:14px;
  
  background-color:transparent;
  color:#02113B;
  border: none;
}
`
const StartTime = styled.div`
font-size:16px;
background-color:transparent;
color: #02113B;
border: none;
`
const EndTime = styled.div`
font-size:16px;
background-color:transparent;
color: #02113B;
border: none;
`

const RightWrap = styled.div`
padding-right : 10px;`
const WorkWrap = styled.div``
const WorkSelectBoxWrap = styled.div`
display: flex;`
const LabelWork = styled.label`
`
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
  &:hover {
    background-color:#22631C;
    color: white;
    border : none;
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
    background: #22631C;
    color: white;
    border : none;
  }
  display: none;
`;

const InputMemo = styled.textarea`
width : 300px;
font-size : 15px;
font-color : #616161;
padding-top : 10px;
padding-right : 10px;
padding-left : 10px;
padding-bottom : 120px;
border : 1px solid #bfbfbf;
border-radius : 10px;
`

const WorkContent = styled.div`
font-size : 18px;
font-color : #616161;
padding-top : 10px;
padding-right : 10px;
padding-left : 10px;
padding-bottom : 120px;
border : 1px solid #bfbfbf;
border-radius : 10px;
`


const BtnWrap = styled.div`
display : flex;
justify-content :flex-end;
margin-top : 30px;

`
const EditBtn = styled.button`
background-color: #22631C;
color : #ffffff;
border-radius: 8px;
border: none;
margin-left: 10px;
padding: 4px 15px;
cursor : pointer;
border : 1px solid #22631C;

&:hover {
  border : 1px solid #318f27;
  background: #22631C;
  opacity : 0.8;
  color: #ffffff;
  font-weight : 400;
}
`

const Btn = styled.button`
  background-color: transparent;
  color : #616161;
  border-radius: 8px;
  border: 1px solid #bfbfbf;
  margin-left: 10px;
  padding: 4px 10px;
  cursor : pointer;
  &:hover {
    background-color: #22631C;
    border : 1px solid #22631C;
    color: white;
    padding : 4px 10px;
    margin-left: 10px;
  }
`;

const Category = styled.span`
  font-size: 24px;
`;

const Price = styled.span`
  font-size: 30px;
`;



const SDatePicker = styled(DatePicker)`
  width: 180px;
  height: 26px;
  border-radius: 10px;
  border: 1px solid black;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;
export default ScheduleModal;
