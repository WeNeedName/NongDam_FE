import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadTodayNewsDB } from "../../redux/modules/main";
import { ShimmerTitle } from "react-shimmer-effects";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ShimmerText } from "react-shimmer-effects";

const TodayNews = () => {
  const dispatch = useDispatch();
  const TodayNewsData = useSelector((state) => state.main.todayNews);
  const is_loaded = useSelector((state) => state.main.news_is_loaded);

  useEffect(() => {
    dispatch(loadTodayNewsDB());
  }, []);

  return (
    <Wrap>
      {is_loaded ? (
        <>
          <Title>💬 오늘의 뉴스</Title>
          <Margin />
          <BoxWrap>
            {TodayNewsData !== undefined &&
              TodayNewsData.map((list, idx) => {
                return (
                  <ContentsBoxWrap
                    key={idx}
                    onClick={() => {
                      window.location.href = list.link;
                    }}
                  >
                    <ContentsWrap>
                      {list.imageUrl !== "" ? (
                        <ImageContent imageURL={list.imageUrl} />
                      ) : null}

                      <ShowMoreBtn>더보기</ShowMoreBtn>

                      <TextWrap>
                        <ContentsT imageURL={list.imageUrl}>
                          {list.title
                            .replace("&quot;", "''")
                            .replace(/(<br>|<br\/>|<br \/>)/g, " ")
                            .replace(/(<b>|<b\/>|<b \/>|<\/b>)/g, " ")
                            .replace(`&lt;`, " ")
                            .replace(`&gt;`, " ")}
                        </ContentsT>
                        <InfoWrap>
                          <ContentsTInfo>{list.article}</ContentsTInfo>
                          {list.article === "" ? null : <InfoHr />}

                          <ContentsTInfo>{list.time}</ContentsTInfo>
                        </InfoWrap>
                      </TextWrap>
                    </ContentsWrap>
                    <Hr />
                  </ContentsBoxWrap>
                );
              })}
          </BoxWrap>
        </>
      ) : (
        <>
          <ShimmerTitle
            className="thumNail-news-title"
            line={1}
            gap={10}
            variant="secondary"
          />
          <Margin />
          <LoadWrap>
            <ShimmerThumbnail
              className="thumNail-news-image"
              height={50}
              rounded
            />
            <ShimmerText className="thumNail-news-text" line={2} gap={10} />
          </LoadWrap>
          <Margin />
          <LoadWrap>
            <ShimmerThumbnail
              className="thumNail-news-image"
              height={50}
              rounded
            />
            <ShimmerText className="thumNail-news-text" line={2} gap={10} />
          </LoadWrap>
          <Margin />
          <LoadWrap>
            <ShimmerThumbnail
              className="thumNail-news-image"
              height={50}
              rounded
            />
            <ShimmerText className="thumNail-news-text" line={2} gap={10} />
          </LoadWrap>
        </>
      )}
    </Wrap>
  );
};

const LoadWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Wrap = styled.div`
  border: none;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 20px 20px 0px 20px;
  grid-column: 4 / 5;
  grid-row: 2 / 5;
  background-color: #fff;
  /* overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  } */
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 12 / 13;
  }
`;

const BoxWrap = styled.div`
  height: 290px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 10px;
`;

const Margin = styled.div`
  height: 10px;
  width: 100%;
  border-bottom: 0.5px solid #dddddd;
  margin-left: -20px;
  padding-right: 40px;
`;

const ContentsBoxWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

const ShowMoreBtn = styled.div`
  font-weight: 400;
  font-size: 8px;
  line-height: 24px;
  color: #8e8f93;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 14px;
`;

const InfoHr = styled.div`
  width: 1px;
  height: 9px;
  border-right: 1px solid #02113b;
  margin: 1px 4px 0px 3px;
`;

const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin-left: -20px;
  padding-right: 40px;
  border-bottom: 0.5px solid #dddddd;
  margin-top: 10px;
`;

const ContentsWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0px 0px 0px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const InfoWrap = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const ContentsT = styled.div`
  width: ${(props) => (props.imageURL === "" ? "290px" : "200px")};
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  font-size: 13px;
  font-weight: 500;

  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 1220px) {
    width: ${(props) => (props.imageURL === "" ? "80%" : "170px")};
  }
  @media only screen and (max-width: 760px) {
    width: ${(props) => (props.imageURL === "" ? "90%" : "190px")};
  }
`;

const ContentsTInfo = styled.div`
  font-weight: 400;
  font-size: 10px;
`;

const ImageContent = styled.div`
  width: 26%;
  padding-bottom: 20%;
  background-image: url(${(props) => props.imageURL});
  /* background-image: url(https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/snapshots/164422528068537909.jpeg?gif=1&w=1080); */
  background-position: center 30%;
  background-size: cover;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 12px;
  @media only screen and (max-width: 1220px) {
    width: 28%;
    padding-bottom: 22%;
  }
  @media only screen and (max-width: 760px) {
    width: 24%;
    padding-bottom: 18%;
  }
`;

export default TodayNews;
