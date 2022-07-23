import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import EditWorkLog from "../components/workLog/EditWorkLog";

import { loadWorkLogDB, deleteWorkLogDB } from "../redux/modules/workLog";
import moment from "moment";
import "moment/locale/ko";

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
  console.log(workLogOne?.images);
  return (
    <Container>
      <Header />
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
                    const result = window.confirm(
                      "삭제하시겠습니까? 삭제한 내역은 되돌릴 수 없습니다."
                    );
                    if (result) {
                      dispatch(deleteWorkLogDB(params.id));
                    }
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
            </DateWrap>{" "}
            <CropWrap>
              <SmallTitle>작물</SmallTitle>
              <CropContent>
                {workLogOne !== undefined &&
                  workLogOne.crop !== undefined &&
                  workLogOne?.crop?.type}
              </CropContent>
            </CropWrap>
            <QuantityWrap>
              <SmallWrap>
                {workLogOne?.subMaterial !== undefined &&
                  workLogOne?.subMaterial[0] !== undefined &&
                  workLogOne?.subMaterial[0]?.product && (
                    <Fertilizer>
                      <SmallTitle> 비료</SmallTitle>
                      <Quantity>
                        {workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial[0]?.product}
                      </Quantity>
                      <Quantity>
                        {workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial[0]?.use}
                      </Quantity>
                    </Fertilizer>
                  )}
                {workLogOne?.subMaterial !== undefined &&
                  workLogOne?.subMaterial[1] !== undefined &&
                  workLogOne?.subMaterial[1]?.product && (
                    <Chemical>
                      <SmallTitle> 농약</SmallTitle>
                      <Quantity>
                        {workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial[1]?.product}
                      </Quantity>
                      <Quantity>
                        {workLogOne.subMaterial !== undefined &&
                          workLogOne?.subMaterial !== undefined &&
                          workLogOne?.subMaterial[1]?.use}
                      </Quantity>
                    </Chemical>
                  )}
              </SmallWrap>
              <Harvest>
                <SmallTitle>수확량</SmallTitle>
                <Quantity>
                  {workLogOne !== undefined &&
                    workLogOne?.harvest !== undefined &&
                    workLogOne?.harvest + "kg"}
                </Quantity>
              </Harvest>
              <WorkingHour>
                <SmallTitle>작업시간</SmallTitle>
                <Quantity>
                  {workLogOne !== undefined &&
                    workLogOne?.workTime !== undefined &&
                    workLogOne?.workTime + "시간"}
                </Quantity>
              </WorkingHour>
            </QuantityWrap>
            {workLogOne !== undefined && workLogOne?.images !== undefined ? (
              <Images
                style={{
                  backgroundImage: `url(${workLogOne?.images})`,
                }}
              />
            ) : (
              <div></div>
            )}
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
  border-radius: 10px;
  border: 1px solid #bfbfbf;
  color: #616161;
  font-size: 14px;
  margin-top: 5px;
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
  padding: 5px;
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
