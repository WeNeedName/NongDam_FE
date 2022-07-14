import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../redux/modules/users";
import Select from "react-select";
import { getInfoDB } from "../redux/modules/users";

// 이미지
import Profile from "../images/Profile.png";

// 컴포넌트 파일
import Header from "../components/Header";
import MarketPriceCard from "../components/marketPrice/MarketPriceCard";
import MyCropsMarketPriceCard from "../components/marketPrice/MyCropsMarketPriceCard";
import TodaysMarketPrice from "../components/marketPrice/TodaysMarketPrice";
import TodaysSalePrice from "../components/marketPrice/TodaysSalePrice";
import { getMyCropsMarketPriceDB } from "../redux/modules/main";

const MarketPrice = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(null);
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [selectedCropsB, setSelectedCropsB] = useState([]);
  const [salePrice, setSalePrice] = useState(0);
  const cropsData = useSelector((state) => state.users.crops);

  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();

  const userInfo = useSelector((state) => state.users.user);
  const AllmarketPriceData = useSelector(
    (state) => state.main.myCropsMarketPrice
  );

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  const onDragStart = (e) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(e.pageX + scrollRef.current.scrollLeft);
  };

  const onDragEnd = () => {
    setIsDrag(false);
  };

  const onDragMove = (e) => {
    if (isDrag) {
      const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
      scrollRef.current.scrollLeft = startX - e.pageX;
      if (scrollLeft === 0) {
        setStartX(e.pageX);
      } else if (scrollWidth <= clientWidth + scrollLeft) {
        setStartX(e.pageX + scrollLeft);
      }
    }
  };

  const throttle = (func, ms) => {
    let throttled = false;
    return (...args) => {
      if (!throttled) {
        throttled = true;
        setTimeout(() => {
          func(...args);
          throttled = false;
        }, ms);
      }
    };
  };

  const delay = 100;
  const onThrottleDragMove = throttle(onDragMove, delay);

  useEffect(() => {
    dispatch(getCropsListDB());
  }, []);

  return (
    <div>
      <Header currentPage="marketPrice" />
      <Wrap>
        <BodyWrap>
          <MarketPriceCard
            cropsData={cropsData}
            setSelectedCrops={setSelectedCrops}
          />
          <TodaysMarketPrice
            cropsData={cropsData}
            setSelectedCrops={setSelectedCropsB}
            setSalePrice={setSalePrice}
            salePrice={salePrice}
          />
          <TodaysSalePrice
            cropsData={cropsData}
            selectedCropsB={selectedCropsB}
            salePrice={salePrice}
          />
        </BodyWrap>
        {userInfo !== undefined && userInfo?.crops.length !== 0 ? (
          <>
            <Title>👀 내 작물 시세를 한 눈에</Title>
            <MyCropsChartWrap
              onMouseDown={onDragStart}
              onMouseMove={isDrag ? onThrottleDragMove : null}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              ref={scrollRef}
            >
              {userInfo !== undefined && userInfo?.crops.length > 3 ? (
                <>
                  <GradationBox />
                  <GradationBox />
                </>
              ) : null}
              {/* <Div />
          <Div /> */}
              {/* <MyCropsMarketPriceCard />
              <MyCropsMarketPriceCard />
              <MyCropsMarketPriceCard />
              <MyCropsMarketPriceCard /> */}
              <MyCropsMarketPriceCard />
            </MyCropsChartWrap>
          </>
        ) : null}
      </Wrap>
    </div>
  );
};

const Wrap = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  /* display: grid;
  grid-template-columns: 1fr 72% 1fr;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr 81% 1fr;
  } */
`;

const BodyWrap = styled.div`
  width: 100vw;
  max-width: 1920px;
  height: auto;
  /* display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center; */
  display: grid;
  grid-template-columns: 1fr repeat(3, minmax(20%, 23%)) 1fr;
  grid-auto-rows: auto;
  row-gap: 16px;
  column-gap: 20px;
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, minmax(26%, 26%)) 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin: 30px 0px;
  margin-left: 14%;
  @media only screen and (max-width: 1220px) {
    margin-left: 9.5%;
  }
`;

const GradationBox = styled.div`
  width: 200px;
  position: absolute;
  bottom: 42px;
  right: 0;
  height: 264px;
  z-index: 100;
  background-blend-mode: overlay;
  background-color: #f5f5f5;
  /* background: linear-gradient(to right, transparent, white); */
  /* background-image: url("https://s3.ap-northeast-2.amazonaws.com/engmemo.shop/13.+%E1%84%82%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%E1%84%92%E1%85%A7%E1%86%AB%E1%84%92%E1%85%AA%E1%86%BC+%E2%80%93+2.png"); */
  background: linear-gradient(to right, transparent, #fff);
`;

const MyCropsChartWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 14%;
  padding-bottom: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  @media only screen and (max-width: 1220px) {
    padding-left: 9.5%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Div = styled.div`
  width: 400px;
  height: 100px;
  border: none;
  background-color: red;
`;

export default MarketPrice;
