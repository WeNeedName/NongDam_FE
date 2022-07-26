import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import EditWorkLog from "../components/workLog/EditWorkLog";

import { loadWorkLogDB, deleteWorkLogDB } from "../redux/modules/workLog";
import moment from "moment";
import "moment/locale/ko";

// alert 라이브러리
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// 컴포넌트
import FooterNav from "../components/FooterNav";

const DetailWorkLog = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(loadWorkLogDB(params.id));
  }, []);

  const workLogOne = useSelector((state) => state?.workLog?.workLog);
  const dateFormat = moment(workLogOne?.date).format("YYYY.MM.DD");

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
            <TopWrap>
              <Title> {workLogOne?.title} </Title>
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
                    </Quantity>
                    <Quantity>
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
                        workLogOne?.subMaterial[1]?.product}
                    </Quantity>
                    <Quantity>
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
              <SmallTitle> 작업내용</SmallTitle>
              <WorkContent>
                {workLogOne !== undefined &&
                  workLogOne.memo !== undefined &&
                  workLogOne?.memo}
              </WorkContent>
            </WorkWrap>
          </ContentWrap>
        </TotalWrap>
      ) : (
        <EditWorkLog workLogOne={workLogOne} isEdit={isEdit} />
      )}
      <FooterNav currentPage="workLog" />
    </Container>
  );
};

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
`;
const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BtnWrap = styled.div``;
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
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Title = styled.div`
  font-size: 36px;
  margin-bottom: 10px;
`;

const DateWrap = styled.div`
  display: flex;
  font-size: 20px;
  margin-bottom: 10px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
  margin-right: 10px;
`;

const SmallWrap = styled.div`
  display: flex;
  /* margin-right: 10px; */
  margin-bottom: 10px;
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
  font-size: 14px;
  margin-top: 10px;
`;

const WorkWrap = styled.div`
  display: inline-flex;
  flex-flow: column;
  margin-top: 18px;
  margin-bottom: 10px;
`;

const WorkContent = styled.div`
  width: 400px;
  height: 100px;
  border-radius: 5px;
  display: inline-block;
  text-align: left;
  border: none;
  color: #616161;
  font-size: 14px;
  margin-top: 5px;
`;

const QuantityWrap = styled.div`
  display: flex;

  margin-bottom: 10px;
`;
const Chemical = styled.div`
  margin-right: 10px;
`;
const Fertilizer = styled.div`
  margin-right: 10px;
`;
const Harvest = styled.div`
  margin-right: 10px;
`;

const WorkingHour = styled.div``;

const Quantity = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;

const Images = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  background-size: cover;
`;

export default DetailWorkLog;
