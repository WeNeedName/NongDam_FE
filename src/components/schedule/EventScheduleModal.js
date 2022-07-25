import React from "react";
import styled from "styled-components";
import Modal from "styled-react-modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// 날짜 라이브러리
import moment from "moment";
import "moment/locale/ko";

const EventScheduleModal = ({
  isOpen,
  toggleModal,
  eventInfo,
  scheduleList,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(eventInfo);

  const eventInfoStartTime = moment(eventInfo.start).format(
    "YY년 MM월 DD일 HH시MM분"
  );
  const eventInfoEndTime = moment(eventInfo.end).format(
    "YY년 MM월 DD일 HH시MM분"
  );
  return (
    <>
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <TotalTitle>일정확인 </TotalTitle>
        <Wrap>
          <CropWrap>
            <SmallTitle>작물</SmallTitle>
            <Content>{eventInfo.crop.name}</Content>
          </CropWrap>
          <WorkWrap>
            <SmallTitle>작업내용</SmallTitle>
            <Content> {eventInfo.title}</Content>
          </WorkWrap>
          <TimeWrap>
            <SmallTitle>날짜</SmallTitle>
            <TimeContentWrap>
              <TimeContent>
                <TimeTitle>시작일</TimeTitle>
                {eventInfoStartTime}
              </TimeContent>
              <TimeContent>
                <TimeTitle> 종료일</TimeTitle>
                {eventInfoEndTime}
              </TimeContent>
            </TimeContentWrap>
          </TimeWrap>
        </Wrap>
      </StyledModal>
    </>
  );
};
const StyledModal = Modal.styled`
  width: 300px;
  background-color: white;
  border-radius: 10px;
  padding: 30px;
`;
const TotalTitle = styled.label`
  font-size: 27px;
  font-weight: 700;
  display: flex;
  text-align: left;
  align-items: start;
  margin-bottom: 15px;
`;
const Wrap = styled.div``;
const SmallTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const CropWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  margin-left: 10px;
  font-size: 14px;
  color: #616161;
  border: 1px solid #bfbfbf;
  padding: 4px 10px;
  border-radius: 10px;
`;

const WorkWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TimeWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px;
  align-items: center;
  margin-bottom: 10px;
`;

const TimeContentWrap = styled.div`
  flex-direction: column;
  text-align: end;
`;
const TimeTitle = styled.div`
  line-height: 16px;
  font-size: 11px;
  color: #bfbfbf;
  align-items: center;
  text-align: center;
  margin-right: 8px;
`;
const TimeContent = styled.div`
  display: flex;
  margin-left: 10px;
  font-size: 14px;
`;

export default EventScheduleModal;
