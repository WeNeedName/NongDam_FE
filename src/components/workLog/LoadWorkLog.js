import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// 날짜 포맷 라이브러리
import moment from "moment";
import "moment/locale/ko";
//로딩 효과
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";

const LoadWorkLog = ({ workLogList }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch;

  //const goToDetail = navigate(`/detail/${workLogList.id}`);
  const [workLogId, setWorkLogId] = useState();
  const is_loaded = useSelector((state) => state.workLog.workLogList_is_loaded);

  return (
    <Container>
      <Wrap className="wrap">
        <TopWrap className="topWrap">
          <Title className="totalTitle"> 영농일지</Title>
          <BtnWrap>
            {/* <SearchByCrops></SearchByCrops> */}
            {/* <SearchByDateBtn>날짜로 조회</SearchByDateBtn> */}
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
        {is_loaded ? (
          workLogList !== undefined ? (
            workLogList.map((list, i) => {
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
                          <DateContent>
                            {list?.date &&
                              moment(list?.date).format("YYYY.MM.DD")}
                          </DateContent>
                        </TimeContentWrap>
                        <WorkContent className="workMemoWrap">
                          {list?.memo}
                        </WorkContent>
                        <CropContent>{list?.crop?.type}</CropContent>
                      </LeftContent>
                      <RightContent>
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
          ) : null
        ) : (
          <>
            {Array.from({ length: 5 }, (v, i) => i).map((list, index) => {
              return (
                <ShimmerWrap key={index}>
                  <ShimmerTextWrap>
                    <ShimmerTitle
                      className="thumNail-news-title"
                      line={1}
                      gap={10}
                      variant="secondary"
                    />

                    <ShimmerText
                      className="thumNail-workLog-text"
                      line={4}
                      gap={10}
                    />
                  </ShimmerTextWrap>

                  <ShimmerThumbnail
                    className="thumNail-workLog"
                    height={150}
                    width={150}
                    rounded
                  />
                </ShimmerWrap>
              );
            })}
          </>
        )}
      </Wrap>
    </Container>
  );
};

const boxScale = keyframes`
  0% {
    transform: scale(1);
 
  }
  100% {
    transform: scale(1.02);
  }
`;

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateY(5%);
 
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
  @media only screen and (max-width: 760px) {
    width: 95%;
  }
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
  border-radius: 100px;
  color: #ffffff;
  background-color: #55a349;
  border: 1px solid #55a349;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
    border: 1px solid #22631c;
  }
`;

const BoxWrap = styled.div`
  flex-wrap: wrap;
  @media only screen and (max-width: 760px) {
    width: 95%;
  }
`;

const WorkLogBox = styled.div`
  width: 580px;
  height: auto;
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: 3fr 1fr;
  background-color: #ffffff;
  border-radius: 8px;
  height: auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  padding: 25px;
  flex-direction: row;
  position: relative;
  margin-bottom: 20px;
  animation: ${boxFade} 1s;
  cursor: pointer;
  @media only screen and (max-width: 760px) {
    width: 95%;
  }
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ShimmerWrap = styled.div`
  width: 580px;
  background-color: #ffffff;
  border-radius: 8px;
  height: auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  padding: 25px 25px 5px 25px;
  flex-direction: row;
  position: relative;
  margin-bottom: 20px;
  /* animation: ${boxFade} 1s; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  @media only screen and (max-width: 760px) {
    width: 95%;
  }
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

const WorkContent = styled.div`
  /* width: ${(props) => (props.imageURL === "" ? "290px" : "200px")}; */
  width: 400px;

  font-size: 14px;
  flex-direction: row;
  margin: 10px 0px;
  margin-right: 10px;
  line-height: 20px;
  color: #7a7a7a;

  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const CropContent = styled.div`
  display: inline-block;

  border: 1px solid #bfbfbf;
  color: #616161;
  font-size: 14px;
  width: auto;
  height: auto;
  padding: 4px 12px;
  border-radius: 100px;
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

const ShimmerTextWrap = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export default LoadWorkLog;
