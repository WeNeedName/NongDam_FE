import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const LoadWorkLog = ({ workLogList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch;

  //const goToDetail = navigate(`/detail/${workLogList.id}`);
  const [workLogId, setWorkLogId] = useState();

  return (
    <Container>
      <Wrap className="wrap">
        <TopWrap className="topWrap">
          <Title className="totalTitle"> 최근 영농일지</Title>
          <BtnWrap>
            {/* <SearchByCrops></SearchByCrops> */}
            <SearchByDateBtn>날짜로 조회</SearchByDateBtn>
            <WriteBtn
              className="WriteBtn"
              onClick={() => {
                navigate("/writeworklog");
              }}
            >
              + 기록하기
            </WriteBtn>
          </BtnWrap>
        </TopWrap>

        {workLogList !== undefined
          ? workLogList.map((list, i) => {
              return (
                <BoxWrap
                  className="boxWrap"
                  onClick={() => {
                    navigate(`/worklog/detail/${list.id}`);
                  }}
                  key={i}
                >
                  <div>
                    <WorkLogBox className="workLogBox">
                      <LeftContent>
                        <TitleContent>{list?.title}</TitleContent>
                        <TimeContentWrap>
                          <DateContent>{list?.date}</DateContent>
                        </TimeContentWrap>
                        <WorkContent className="workMemoWrap">
                          {list?.memo}
                        </WorkContent>
                        <CropContent>{list?.crop?.type}</CropContent>
                      </LeftContent>
                      <RightContent>
                        <MoreVertIcon
                          style={{
                            marginLeft: "140px",
                            marginBottom: "10px",
                          }}
                        />
                        {list.images[0] !== undefined ? (
                          <ImgContent
                            style={{
                              backgroundImage: `url(${list?.images})`,
                              backgroundSize: "cover",
                            }}
                          />
                        ) : null}
                      </RightContent>
                    </WorkLogBox>
                  </div>
                </BoxWrap>
              );
            })
          : null}
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  width: 630px;
  padding: 30px;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border-radius: 10px;
`;

const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const BtnWrap = styled.div``;

const SearchByCrops = styled.button``;

const SearchByDateBtn = styled.button`
  margin-left: 10px;
  padding: 4px 15px;
  border-radius: 10px;
  color: #616161;
  border: 1px solid #bfbfbf;
  background-color: #fff;
`;
const WriteBtn = styled.button`
  margin-left: 10px;
  padding: 4px 15px;
  border-radius: 10px;
  color: #ffffff;
  background-color: #22631c;
  border: 1px solid #22631c;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const BoxWrap = styled.div`
  flex-wrap: wrap;
`;

const WorkLogBox = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 3fr 1fr;
  width: 580px;
  background-color: #ffffff;
  border-radius: 10px;
  height: auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  background: #fff;
  border-radius: 6px;
  padding: 25px;
  flex-direction: row;
  justify-content: center;
  position: relative;
  margin-bottom: 30px;
  //cursor : pointer;
  // &:hover {
  //   box-shadow : 0px 6px 10px rgba(0, 0, 0, 0.15);
  // }
`;

const LeftContent = styled.div`
  margin-top: 5px;
`;

const TitleContent = styled.div`
  font-size: 24px;
  margin: 10px 0px;
  font-weight: 500;
`;
const TimeContentWrap = styled.div`
  display: flex;
  margin: 10px 0px;
`;

const DateContent = styled.div`
  font-size: 14px;
  margin-right: 3px;
`;

const DurationContent = styled.div`
  font-size: 14px;
`;
const WorkContent = styled.div`
  font-size: 14px;
  flex-direction: row;
  margin: 10px 0px;
  margin-right: 10px;
  line-height: 20px;
`;

const CropContent = styled.div`
  display: inline-block;

  border: 1px solid #bfbfbf;
  color: #616161;
  font-size: 14px;
  width: auto;
  height: auto;
  padding: 4px 12px;
  border-radius: 10px;
`;
const RightContent = styled.div`
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ImgContent = styled.img`
  width: 150px;
  height: 150px;
`;

const SmallTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 10px;
`;

export default LoadWorkLog;
