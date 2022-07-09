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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schedule = currentScheduleList.find((list) => list.id === scheduleId);
  const myCropsList = useSelector((state) => state.users.user?.crops)

  console.log(myCropsList)
  console.log(schedule.cropId)

  const [openEdit, setOpenEdit] = useState(false);
  const [startTime, setStartTime] = useState(new Date(schedule.startTime));
  const [endTime, setEndTime] = useState(new Date(schedule.endTime));
  const [toDo, setToDo] = useState(schedule.toDo);
  
  const [newCrop, setNewCrop] = useState("");
  //const [cropToDo, setCropToDo] = useState("")
  const [checkedInputs, setCheckedInputs] = useState("");
  const [checkedCrops, setCheckedCrops] = useState(schedule.cropId);
    
  function toggleEditModal() {
    setOpenEdit(!openEdit);
  }
  
  // useEffect(() => {
  //   setTimeout(() => {
  //     ref.current.click();
  //   }, 100); //miliseconds
  // }, []);



  const changeRadioCrops = (e) => {
    if (e.target.checked) {
      setCheckedCrops(e.target.id);
           
    }
  };


  // date 형식 변경
  const selecStartTime = moment(startTime).format("YYYY-MM-DD");
  const selecEndTime = moment(endTime).format("YYYY-MM-DD");
  console.log(checkedCrops)

  const editSchedule = () => {
    const id = schedule.id;
    const data = {
      cropId: checkedCrops,
      startTime: startTimeFormat,
      endTime: endtimeFormat,
      toDo: toDo,
    };
    console.log(id, data)
    dispatch(editScheduleDB(id, data)).then(() => {
      toggleModal();
    });
  };
  const startTimeFormat = moment(startTime).format("YYYY-MM-DD HH:mm")
  const endtimeFormat = moment(endTime).format("YYYY-MM-DD HH:mm")
  
  return (
      
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <Wrap>
        <TopWrap>
          <Time>
          <SmallTitle>시작일</SmallTitle> 
          {openEdit ? (
              <DatePicker
              className="startDatePicker"
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              minDate={new Date()} //오늘보다 이전 날짜는 선택 못하게 
              dateFormat="yyyy-MM-dd HH:mm"// 시간 포맷 변경
              locale={ko}// 한글로 변경
              //inline//달력 보이게 
              />
            ) : (
              schedule.startTime
            )}
             <SmallTitle>종료일</SmallTitle> 
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
            ) : (
              schedule.endTime
            )}
          </Time>
          {openEdit ? (
            <Btn
              onClick={() => {
                editSchedule();
              }}
            >
              수정완료
            </Btn>
          ) : (
            <div>
              <Btn onClick={toggleEditModal}>수정</Btn>
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
                삭제
              </Btn>
              <Btn onClick={toggleModal}>닫기</Btn>
            </div>
          )}
        </TopWrap>
          <CategoryBigBigWrap>
            {openEdit ? 
              (
              <>
                <Title>작업할 작물</Title>
                <CategoryBigWrap>
                    <CategoryWrap>
                      {myCropsList !== undefined ? 
                        myCropsList.map((list,idx)=>{
                          //setCheckedCrops(.id)
                          console.log(list)
                        return(
                          <Label
                          key={list.id}>
                            <FormCheckLeft
                              // {idx === 0 && selected}
                              checked={idx === 0 ? "checked" : null}
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
                    </CategoryWrap>
                  </CategoryBigWrap>
                </>)
              : (<BottomWrap>
                  <Title>작업할 작물</Title>
                  <Content>
                  {schedule.crop}
                  </Content>
                </BottomWrap>)
            }
          </CategoryBigBigWrap>
        
          <CategoryBigBigWrap>
            {openEdit ? (
            <BottomWrap>
              <Title>할 일</Title>
              <input
                defaultValue={schedule.toDo}
                onChange={(e) => setToDo(e.target.value)}
                placeholder="메모를 입력해주세요"
              />
          </BottomWrap>
        ) : (
          schedule.toDo !== "" && (
            <BottomWrap>
              <Title>할 일</Title>
              <Content>{schedule.toDo}</Content>
            </BottomWrap>
          )
        )} 
        </CategoryBigBigWrap>
      </Wrap>
    </StyledModal>
    
  );
};

const StyledModal = Modal.styled`
  width: 700px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CategoryBigBigWrap = styled.div``


const TimeWrap = styled.div`
flex-direction:column;
`

const TimeSmallWrap = styled.div`
flex-direction: flex`

const SmallTitle = styled.span`
font-size: 20px;
font-weight: bold;
margin: 5px;
`

const Time = styled.span`
  font-size: 18px;
  
`;

const Btn = styled.button`
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid black;
  margin-left: 10px;
  padding: 4px;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  
`;
const Title = styled.p`
font-size:2rem;
font-weight: bold
`
const CategoryBigWrapSub = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  margin-top: 14px;
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
  margin-left: 10px;
  

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

const Content = styled.p`
font-size: 1.3rem;
maring:10px
`


const LabelS = styled.label``;

const Selec = styled.select`
  margin-left: 20px;
  width: 170px;
  background-color: white;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding-left: 10px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-top: 20px;
`;

const Category = styled.span`
  font-size: 24px;
`;

const Price = styled.span`
  font-size: 30px;
`;

const BottomWrap = styled.div`
  display: column;
  flex-direction: row;
  
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
