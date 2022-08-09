import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Header from "../components/Header";
import EditWorkLog from "./EditWorkLog";

import { loadWorkLogDB, deleteWorkLogDB } from "../redux/modules/workLog";
import moment from "moment";
import "moment/locale/ko";

// alert 라이브러리
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// 컴포넌트
import FooterNav from "../components/FooterNav";

// 이미지
import QuestionMark from "../images/QuestionMark.png";
import ExclamationMark from "../images/ExclamationMark.png";

const DetailWorkLog = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const workLogOne = useSelector((state) => state?.workLog?.workLog);
  const dateFormat = moment(workLogOne?.date).format("YYYY.MM.DD");

  useEffect(() => {
    dispatch(loadWorkLogDB(params.id));
  }, [params]);

  const deleteWorkLogModal = () => {
    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#318F27",
      cancelButtonColor: "#ddd",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWorkLogDB(params.id)).then(() => {
          Swal.fire({
            title: "삭제가 완료되었습니다.",
            icon: "success",
            showConfirmButton: false,
            timer: 1300,
            color: "#black",
            padding: "20px",
            width: "400px",
            height: "200px",
          });
          navigate("/worklog");
        });
      }
    });
  };

  return (
    <Container>
      <Header currentPage="workLog" />
      {!isEdit ? (
        <TotalWrap>
          <ContentWrap>
            <BtnWrap>
              <GreyBtn
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                수정
              </GreyBtn>
              <GreyBtn
                onClick={() => {
                  deleteWorkLogModal();
                }}
              >
                삭제
              </GreyBtn>
              <GreyBtn
                onClick={() => {
                  navigate("/worklog");
                }}
              >
                목록
              </GreyBtn>
            </BtnWrap>
            <TopWrap>
              <Title> {workLogOne?.title} </Title>
            </TopWrap>
            <DateWrap>
              {workLogOne !== undefined &&
                workLogOne.date !== undefined &&
                dateFormat}
            </DateWrap>
            <CropWrap>
              <SmallTitle>작물</SmallTitle>
              <CropContent>
                {workLogOne !== undefined &&
                  workLogOne.crop !== undefined &&
                  workLogOne?.crop?.type}
              </CropContent>
            </CropWrap>
            <QuantityWrap>
              <WorkingHour>
                <SmallTitle>작업시간</SmallTitle>
                <Quantity>
                  {workLogOne !== undefined &&
                    workLogOne?.workTime !== undefined &&
                    workLogOne?.workTime + "시간"}
                </Quantity>
              </WorkingHour>
              <SmallWrap>
                {workLogOne.subMaterial !== undefined &&
                workLogOne?.subMaterial[0]?.product !== undefined &&
                workLogOne?.subMaterial[0]?.product !== "0" &&
                workLogOne?.subMaterial[0]?.product !== "" &&
                workLogOne?.subMaterial[0]?.use !== "" &&
                workLogOne?.subMaterial[0]?.use !== "0" &&
                workLogOne?.subMaterial[0]?.use !== undefined ? (
                  <Fertilizer>
                    <SmallTitle> 비료</SmallTitle>
                    <Quantity>
                      {workLogOne?.subMaterial[0]?.product !== ""
                        ? workLogOne?.subMaterial[0]?.product
                        : null}
                      {workLogOne?.subMaterial[0]?.use !== "0"
                        ? workLogOne?.subMaterial[0]?.use
                        : null}
                    </Quantity>
                  </Fertilizer>
                ) : null}

                {workLogOne.subMaterial !== undefined &&
                workLogOne?.subMaterial[1]?.product !== undefined &&
                workLogOne?.subMaterial[1]?.product !== "0" &&
                workLogOne?.subMaterial[1]?.product !== "" &&
                workLogOne?.subMaterial[1]?.use !== "0" &&
                workLogOne?.subMaterial[1]?.use !== undefined &&
                workLogOne?.subMaterial[1]?.use !== "" ? (
                  <Chemical>
                    <SmallTitle> 농약</SmallTitle>
                    <Quantity>
                      {workLogOne?.subMaterial !== undefined &&
                        workLogOne?.subMaterial[1] !== undefined &&
                        workLogOne?.subMaterial[1]?.product !== undefined &&
                        workLogOne?.subMaterial[1]?.product}{" "}
                      {workLogOne.subMaterial !== undefined &&
                      workLogOne?.subMaterial !== undefined &&
                      workLogOne?.subMaterial[1]?.use !== undefined &&
                      workLogOne?.subMaterial[1]?.use !== "0"
                        ? workLogOne?.subMaterial[1]?.use
                        : null}
                    </Quantity>
                  </Chemical>
                ) : null}
              </SmallWrap>
              <Harvest>
                {workLogOne !== undefined &&
                workLogOne?.harvest !== undefined &&
                workLogOne?.harvest !== "0" ? (
                  <>
                    <SmallTitle>수확량</SmallTitle>
                    <Quantity>{workLogOne?.harvest + "kg"}</Quantity>
                  </>
                ) : null}
              </Harvest>
            </QuantityWrap>
            {(workLogOne !== undefined &&
              workLogOne.images !== undefined &&
              workLogOne?.images.length) > 0 ? (
              <Images
                style={{
                  backgroundImage: `url(${workLogOne?.images})`,
                }}
              />
            ) : null}
            <WorkWrap>
              {/* <SmallTitle> 작업내용</SmallTitle> */}
              <WorkContent>
                {workLogOne !== undefined &&
                  workLogOne.memo !== undefined &&
                  workLogOne?.memo}
              </WorkContent>
            </WorkWrap>
            <Hr />
            {workLogOne.next && (
              <PreContentBox
                onClick={() => {
                  navigate(`/worklog/detail/${workLogOne?.next?.id}`);
                }}
              >
                <PreT>다음 일지</PreT>
                <PreTitle>{workLogOne.next.title}</PreTitle>
              </PreContentBox>
            )}
            {workLogOne.pre && (
              <PreContentBox
                onClick={() => {
                  navigate(`/worklog/detail/${workLogOne?.pre?.id}`);
                }}
              >
                <PreT>이전 일지</PreT>
                <PreTitle>{workLogOne.pre.title}</PreTitle>
              </PreContentBox>
            )}
          </ContentWrap>
        </TotalWrap>
      ) : (
        <EditWorkLog workLogOne={workLogOne} isEdit={isEdit} />
      )}
      <Icon
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        Image={QuestionMark}
        chickenIcon={ExclamationMark}
        onClick={() => {
          const openNewWindow = window.open("about:blank");
          openNewWindow.location.href =
            "https://docs.google.com/forms/d/e/1FAIpQLSfdZk0LhMOcp8FVaChB2mvIvixRKmY4A_iErl-UsoI0qPJVLg/viewform?usp=sf_link";
        }}
      />
      {isHovering ? (
        <Info>
          <Emoji>🧑‍🌾</Emoji> 농담이 처음이신가요?
        </Info>
      ) : null}
      <FooterNav currentPage="workLog" />
    </Container>
  );
};

const boxFadeB = keyframes`
  0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const boxFadeC = keyframes`
  0% {
    transform: scale(1, 1);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  }
  100% {
    transform: scale(1.2, 1.2);
    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const TotalWrap = styled.div`
  width: 700px;
  height: auto;
  border-radius: 20px;
  padding: 30px;
  margin-top: 120px;
  position: relative;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 40px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 90%;
    margin-bottom: 110px;
    border-radius: 0px;
    margin-top: 110px;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BtnWrap = styled.div`
  align-self: flex-end;
`;
const GreyBtn = styled.button`
  width: 50px;
  height: 30px;
  margin-left: 10px;
  background-color: transparent;
  color: #616161;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 46px;
    height: 24px;
    font-size: 11px;
    border-radius: 4px;
  }
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Title = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
  margin-top: 10px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 30px;
    margin-top: 20px;
    margin-bottom: 4px;
  }
`;

const DateWrap = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 10px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SmallWrap = styled.div`
  display: flex;
  /* margin-right: 10px; */
  margin-bottom: 10px;
  margin-right: 20px;
`;

const SmallBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CropWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-bottom: 20px;
`;

const CropContent = styled.div`
  width: max-content;
  height: auto;
  padding: 4px 12px;
  border-radius: 100px;
  border: 1px solid #bfbfbf;
  color: #616161;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 10px;
`;

const WorkWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-top: 18px;
  margin-bottom: 10px;
`;

const WorkContent = styled.div`
  max-width: 680px;
  width: 90%;
  height: auto;
  border-radius: 5px;
  display: inline-block;
  text-align: left;
  border: none;
  color: #616161;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 10px;
  white-space: pre-wrap;
`;

const QuantityWrap = styled.div`
  display: flex;

  margin-bottom: 10px;
`;

const Chemical = styled.div`
  margin-right: 10px;
`;

const Fertilizer = styled.div`
  margin-right: 30px;
`;

const Harvest = styled.div`
  margin-right: 10px;
`;

const WorkingHour = styled.div`
  margin-right: 20px;
`;

const Quantity = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: 5px;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Images = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  background-size: cover;
  margin-top: 10px;
  border-radius: 6px;
  background-position: center 30%;
  background-size: cover;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 100%;
    padding-bottom: 60%;
    padding-right: 20%;
    margin-left: -10%;
    border-radius: 0px;
  }
`;

const Hr = styled.div`
  width: 100%;
  height: 0.5px;
  border: none;
  border-bottom: 1px solid #aaaaaa;
  margin: 10px 0px;
`;

const PreContentBox = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin: 8px 0px;
  &:hover {
    font-weight: 500;
  }
`;

const PreT = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: #878787;
  margin-right: 20px;
`;

const PreTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Info = styled.div`
  width: 220px;
  height: 60px;
  border-radius: 8px;
  position: absolute;
  position: fixed;
  right: 190px;
  bottom: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: ${boxFadeB} 1s;
  z-index: 1000;
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    bottom: 120px;
    right: 150px;
    display: none;
  }
`;

const Icon = styled.div`
  width: 80px;
  height: 80px;
  background-image: url(${(props) => props.Image});
  background-position: center 30%;
  background-size: cover;
  position: fixed;
  bottom: 90px;
  right: 70px;
  z-index: 110;
  border-radius: 100px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  cursor: pointer;
  &:hover {
    animation: ${boxFadeC} 2s;
    background-image: url(${(props) => props.chickenIcon});
  }
  @media only screen and (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 60px;
    height: 60px;
    bottom: 120px;
    right: 50px;
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-right: 4px;
`;

export default DetailWorkLog;
