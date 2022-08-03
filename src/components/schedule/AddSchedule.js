import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { addScheduleDB } from "../../redux/modules/schedule";

//달력
import DatePicker, { registerLocale } from "react-datepicker";
import "../../react-datepickerSchedule.css";
import { ko } from "date-fns/esm/locale";
import moment, { months } from "moment";
const _ = require("lodash");
// 이미지
import CancelIcon from "../../images/cancelIcon.png";

const AddSchedule = ({ isOpen, toggleModal, scheduleId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checkedInputs, setCheckedInputs] = useState("");
  const [checkedCrops, setCheckedCrops] = useState("");
  const [memo, setMemo] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState("");
  const [dateErr, setDateErr] = useState(false);
  const myCropsList = useSelector((state) => state.users.user?.crops);

  const memoRef = useRef();

  const onChangeStartDate = (date) => {
    if (date > endDate) {
      setDateErr(true);
    } else {
      setDateErr(false);
    }
  };

  const onChangeEndDate = (date) => {
    if (startDate >= date) {
      setDateErr(true);
    } else {
      setDateErr(false);
    }
  };

  const changeRadioWork = (e) => {
    if (e.target.checked) {
      memoRef.current.value = e.target.id;
    }
  };

  const changeRadioCrops = (e) => {
    if (e.target.checked) {
      setCheckedCrops(e.target.id);
    }
  };

  const addSchedule = async () => {
    if (!checkedCrops) {
      window.alert("작물을 선택해주세요");
    } else if (!startDate || !endDate || dateErr) {
      window.alert("올바른 날짜를 선택해주세요");
    } else if (!memoRef.current.value) {
      window.alert("작업내용을 입력해주세요");
    } else {
      await dispatch(
        addScheduleDB({
          cropId: checkedCrops,
          startTime: startDateFormat,
          endTime: endDateFormat,
          toDo: memoRef.current.value,
        })
      ).then((res) => {
        toggleModal();
      });
    }
  };

  const startDateFormat = moment(startDate).format("YYYY-MM-DD HH:mm");
  const endDateFormat = moment(endDate).format("YYYY-MM-DD HH:mm");

  const goMyPage = () => {
    navigate("/mypage/editmemberinfo");
  };

  return (
    <>
      {myCropsList.length === 0 ? (
        <>
          <NoCropStyledModal
            isOpen={isOpen}
            onBackgroundClick={toggleModal}
            onEscapeKeydown={toggleModal}
          >
            <NoCropModalContent>
              <AlertMessage> 내 작물을 등록해주세요</AlertMessage>
              <GoToMyPage onClick={goMyPage}>내 작물 등록하러 가기</GoToMyPage>
            </NoCropModalContent>
          </NoCropStyledModal>
        </>
      ) : (
        <StyledModal
          isOpen={isOpen}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
        >
          <WrapWrap>
            <TitleWrap>
              <TotalTitle>일정 기록하기</TotalTitle>
              <CancelBtnA src={CancelIcon} alt="닫기" onClick={toggleModal} />
            </TitleWrap>

            <Wrap>
              <ContentWrapL className="left">
                <CropWrap>
                  <SmallTitle className="crop">작물</SmallTitle>
                  <CropSelectBoxWrap>
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
                              <FormCheckText>{list.type}</FormCheckText>
                            </Label>
                          );
                        })
                      : null}
                  </CropSelectBoxWrap>
                </CropWrap>
                <div className="calender-container">
                  <div className="calender-box">
                    <StartDate>
                      <SmallTitle className="startDate">시작</SmallTitle>
                      <div>
                        <DatePicker
                          className="startDatePicker"
                          selected={startDate}
                          onChange={(date) => {
                            onChangeStartDate(date);
                            setStartDate(date);
                          }}
                          selectsStart
                          showTimeSelect
                          startDate={startDate}
                          endDate={endDate}
                          dateFormat="yyyy.MM.dd HH:mm" // 시간 포맷 변경
                          locale={ko}
                        />
                      </div>
                      {dateErr === true && (
                        <ErrorMsg>
                          시작일을 종료일보다 빠르게 지정해주세요
                        </ErrorMsg>
                      )}
                    </StartDate>

                    <EndDate>
                      <SmallTitle className="endDate">종료</SmallTitle>
                      <DatePicker
                        className="endDatePicker"
                        selected={endDate}
                        startDate={startDate}
                        endDate={endDate}
                        selectsEnd
                        onChange={(date) => {
                          onChangeEndDate(date);
                          setEndDate(date);
                        }}
                        showTimeSelect
                        minDate={new Date(startDate)} //시작일보다 이전 날짜는 선택 못하게
                        dateFormat="yyyy.MM.dd HH:mm"
                        locale={ko} // 한글로 변경
                      />
                      {dateErr === true && (
                        <ErrorMsg>
                          종료일을 시작일보다 늦게 지정해주세요
                        </ErrorMsg>
                      )}
                    </EndDate>
                  </div>
                </div>
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
                        value={checkedInputs}
                      />
                      <FormCheckTextWork>비료뿌리기 </FormCheckTextWork>
                    </LabelWork>
                    <LabelWork>
                      <FormCheckLeftWork
                        type="radio"
                        id="농약치기"
                        name="radioButtonWork"
                        onChange={changeRadioWork}
                        value={checkedInputs}
                      />
                      <FormCheckTextWork>농약치기</FormCheckTextWork>
                    </LabelWork>
                    <LabelWork>
                      <FormCheckLeftWork
                        type="radio"
                        id="수확"
                        name="radioButtonWork"
                        onChange={changeRadioWork}
                        value={checkedInputs}
                      />
                      <FormCheckTextWork>수확</FormCheckTextWork>
                    </LabelWork>
                  </WorkSelectBoxWrap>
                </WorkWrap>
                <CategoryBigWrap>
                  <SmallTitle className="todo">작업내용</SmallTitle>
                  <TodoInput type="text" ref={memoRef} maxLength="100" />
                </CategoryBigWrap>
              </ContentWrapR>
            </Wrap>
            <BtnWrap>
              <DoneBtn
                onClick={() => {
                  addSchedule();
                }}
                // disabled={
                //   !checkedCrops ||
                //   !startDate ||
                //   !endDate ||
                //   !memoRef.current.value ||
                //   dateErr
                //     ? true
                //     : false
                // }
              >
                작성완료
              </DoneBtn>
              <CancelBtn
                onClick={() => {
                  toggleModal();
                }}
              >
                취소
              </CancelBtn>
            </BtnWrap>
          </WrapWrap>
        </StyledModal>
      )}
    </>
  );
};

const StyledModal = Modal.styled`
min-width : 300px;
height : auto;
background-color: white;
border-radius: 10px;
padding-top : 24px;
padding-left : 30px;
padding-bottom: 30px;
padding-right : 30px;
z-index: 1000;
  @media only screen and (max-width: 760px) {
    width: 80%;
    height: 600px;
    padding: 40px 40px;
  }
  @media only screen and (max-width: 414px) {
    top: 100px;
    margin-top : 60px;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 60px;
    padding-top : 30px;
    padding-left : 30px;
    padding-bottom: 30px;
    padding-right : 25px;
    height: auto;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const AlertMessage = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const GoToMyPage = styled.button`
  width: 150px;
  padding: 8px 0px;
  border-radius: 10px;
  border: none;
  background-color: #22631c;
  color: #fff;
  font-weight: 400;
  margin-top: 20px;
  cursor: pointer;
`;

const WrapWrap = styled.div`
  width: auto;
  @media only screen and (max-width: 760px) {
    width: 100%;
  }
`;

const TitleWrap = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TotalTitle = styled.label`
  font-size: 27px;
  font-weight: 700;
  display: flex;
  text-align: left;
  align-items: start;
  margin-bottom: 10px;
`;

const CancelBtnA = styled.img`
  width: 18px;
  cursor: pointer;
`;

const Wrap = styled.div`
  width: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* grid-auto-rows: auto;
  grid-template-columns: 1fr 1fr; */
  @media only screen and (max-width: 760px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const ContentWrapL = styled.div`
  flex-direction: column;
  max-width: 300px;
  @media only Screen and (max-width: 760px) {
    justify-content: flex-start;
  }
  @media only Screen and (max-width: 414px) {
    margin-right: 20px;
    width: 100%;
  }
`;

const ContentWrapR = styled.div`
  @media only Screen and (max-width: 760px) {
    justify-content: flex-start;
    margin-top: 20px;
  }
  @media only Screen and (max-width: 414px) {
    justify-content: flex-start;
    margin-top: 10px;
  }
`;

const TodoContent = styled.div`
  // padding: 0px 0px;
  // width: 100vw
  // height: 80vh
`;

const CropWrap = styled.div`
  display: flex;
  width: 240px;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 5px;
  margin-right: 20px;
  flex-wrap: wrap;
  @media only Screen and (max-width: 760px) {
    margin-right: 20px;
  }
  @media only Screen and (max-width: 414px) {
    width: 100%;
  }
`;

const SmallTitle = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;
const CropSelectBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const CalendarContainer = styled.div``;

const StartDate = styled.div`
  margin-bottom: 10px;
  .startDatePicker {
    width: 65%;
    font-size: 20px;
    margin-top: 5px;
    background-color: transparent;
    color: black;
    border: none;
    cursor: pointer;
    border-bottom: 1px solid #bfbfbf;
    flex-wrap: wrap;
    &:focus {
      outline: none;
      border-bottom: 1px solid black;
    }
    @media only Screen and (max-width: 760px) {
      width: 65%;
    }
    @media only Screen and (max-width: 414px) {
      width: 57%;
    }
  }
  @media only Screen and (max-width: 760px) {
    margin-bottom: 30px;
  }
  @media only Screen and (max-width: 414px) {
    margin-bottom: 10px;
  }
`;

const InputDate = styled.span`
  color: pink;
`;

const EndDate = styled.div`
  margin-top: 15px;
  .endDatePicker {
    width: 65%;
    font-size: 20px;
    margin-top: 5px;
    background-color: transparent;
    color: black;
    border: none;
    cursor: pointer;
    border-bottom: 1px solid #bfbfbf;
    &:focus {
      outline: none;
      border-bottom: 1px solid black;
    }
    @media only Screen and (max-width: 760px) {
      width: 65%;
    }
    @media only Screen and (max-width: 414px) {
      width: 57%;
    }
  }
  @media only Screen and (max-width: 760px) {
    margin-bottom: 10px;
  }
  @media only Screen and (max-width: 414px) {
    margin-bottom: 10px;
  }
`;
const ErrorMsg = styled.span`
  text-align: left;
  margin-top: 3px;
  font-size: 11px;
  color: #ec0000;
`;

const FormCheckText = styled.span`
  width: auto;
  height: auto;
  padding: 4px 13px;
  margin-right: 4px;
  border-radius: 13px;
  background: transparent;
  border: 1px solid #ccc;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ccc;
  margin-bottom: 6px;
  &:hover {
    color: black;
    border: 1px solid black;
  }
`;

const FormCheckLeft = styled.input`
  &:checked {
    display: inline-block;
    background: none;
    text-align: center;
    display: none;
  }
  &:checked + ${FormCheckText} {
    color: black;
    border: 1px solid black;
  }
  display: none;

  :focus {
    outline: none;
  }
`;
const Label = styled.label``;

const FormCheckTextWork = styled.span`
  width: auto;
  height: auto;
  padding: 4px 13px;
  border-radius: 13px;
  background: transparent;
  border: 1px solid #ccc;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  color: #ccc;
  &:hover {
    color: black;
    border: 1px solid black;
  }
  @media only Screen and (max-width: 414px) {
    margin-right: 5px;
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
    color: black;
    border: 1px solid black;
  }
  display: none;
  :focus {
    outline: none;
  }
`;

const LabelWork = styled.label``;

const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;

const WorkWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  @media only Screen and (max-width: 760px) {
    margin-right: 0px;
  }
  @media only Screen and (max-width: 414px) {
    margin-bottom: 15px;
  }
`;

const WorkSelectBoxWrap = styled.div`
  display: flex;
`;

const TodoInput = styled.textarea`
  width: 250px;
  height: 80px;
  font-size: 12px;
  border: 1px solid #bfbfbf;
  padding: 10px;
  border-radius: 10px;
  margin-right: 12px;
  resize: none;
  &::placeholder {
    color: #ddd;
    padding: 1px;
  }
  :focus {
    outline: none;
    border: 1px solid black;
  }
  @media only Screen and (max-width: 414px) {
    width: 295px;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 13px;
  margin-top: 10px;
  @media only Screen and (max-width: 760px) {
    margin-top: 20px;
    justify-content: flex-start;
  }
  @media only Screen and (max-width: 414px) {
    margin-top: 10px;
    justify-content: flex-end;
  }
`;

const DoneBtn = styled.button`
  font-size: 11px;
  width: 70px;
  height: 30px;
  background-color: #55a349;
  color: white;
  border: none;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #22631c;
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
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
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default AddSchedule;
