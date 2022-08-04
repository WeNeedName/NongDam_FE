import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getCropsListDB } from "../redux/modules/users";
import Select from "react-select";
import { getInfoDB } from "../redux/modules/users";
import { useNavigate } from "react-router-dom";
import { getMyCropsMarketPriceDB } from "../redux/modules/main";

// 컴포넌트 파일
import Header from "../components/Header";
import MarketPriceCard from "../components/marketPrice/MarketPriceCard";
import MyCropsMarketPriceCard from "../components/marketPrice/MyCropsMarketPriceCard";
import TodaysMarketPrice from "../components/marketPrice/TodaysMarketPrice";
import TodaysSalePrice from "../components/marketPrice/TodaysSalePrice";
import FooterNav from "../components/FooterNav";
import Footer from "../components/Footer";

// 이미지
import QuestionMark from "../images/QuestionMark.png";
import ExclamationMark from "../images/ExclamationMark.png";

const MarketPrice = () => {
  const dispatch = useDispatch();
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [selectedCropsB, setSelectedCropsB] = useState([]);
  const [salePrice, setSalePrice] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const cropsData = useSelector((state) => state.users.crops);

  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  const scrollRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState();
  const [checkedInputs, setCheckedInputs] = useState("month");

  const userInfo = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getInfoDB());
  }, []);

  // 유저 작물 전체 시세 리스트 요청
  useEffect(() => {
    dispatch(getMyCropsMarketPriceDB(checkedInputs));
  }, [checkedInputs]);

  // 항목 선택
  const changeRadio = (e) => {
    if (e.target.checked) {
      setCheckedInputs(e.target.id);
    }
  };
  // 드래그
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
      <Wrap crops={userInfo?.crops.length}>
        <BodyWrap userInfo={userInfo}>
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
        {userInfo !== null && userInfo?.crops.length !== 0 ? (
          <Div>
            <Title>👀 내 작물 시세를 한 눈에</Title>
            <CategoryWrap>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="month"
                  name="radio"
                  onChange={changeRadio}
                  value={checkedInputs}
                  defaultChecked
                />
                <FormCheckText>월별</FormCheckText>
              </Label>
              <Label>
                <FormCheckLeft
                  type="radio"
                  id="year"
                  name="radio"
                  onChange={changeRadio}
                  value={checkedInputs}
                />
                <FormCheckText>연도별</FormCheckText>
              </Label>
            </CategoryWrap>
            <MyCropsChartWrap
              onMouseDown={onDragStart}
              onMouseMove={isDrag ? onThrottleDragMove : null}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}
              ref={scrollRef}
            >
              {/* {scrollWidth !== null &&
              scrollWidth > clientWidth + scrollLeft ? (
                <>
                  <GradationBox />
                  <GradationBox />
                </>
              ) : null} */}
              <MyCropsMarketPriceCard checkedInputs={checkedInputs} />
            </MyCropsChartWrap>
          </Div>
        ) : null}
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
        <FooterNav currentPage="marketPrice" />
      </Wrap>
      <Footer />
    </div>
  );
};

const boxFade = keyframes`
  0% {
    opacity: 0;
    transform: translateX(5%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

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

const Wrap = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${({ crops }) => (crops === 0 ? "300px" : "0px")};
  @media only screen and (max-width: 760px) {
    margin-bottom: 100px;
  }
`;

const BodyWrap = styled.div`
  width: 100vw;
  max-width: 1920px;
  height: auto;
  display: grid;
  grid-template-columns: 1fr repeat(3, minmax(20%, 25%)) 1fr;
  grid-auto-rows: auto;
  row-gap: 16px;
  column-gap: 20px;
  margin-bottom: ${({ userInfo }) => (userInfo === null ? "100px" : "0px")};
  @media only screen and (max-width: 1220px) {
    grid-template-columns: 1fr repeat(3, minmax(26%, 27%)) 1fr;
  }
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr 90% 1fr;
  }
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 30px 0px 10px 0px;
  margin-left: 11.5%;
  @media only screen and (max-width: 760px) {
    margin-left: 5%;
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 0px 20px 0px;
  margin-left: 11.5%;
  @media only screen and (max-width: 760px) {
    margin-left: 5%;
  }
`;

const FormCheckText = styled.span`
  padding: 2px 10px;
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  margin-right: 4px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border: 1px solid #bbb;
  color: #bbb;
  cursor: pointer;
  border-radius: 6px;
  &:hover {
    font-weight: 500;
    color: black;
    border: 1px solid #000000;
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
    font-weight: 500;
    color: black;
    border: 1px solid #000000;
  }
  display: none;
`;

const Label = styled.label``;

const GradationBox = styled.div`
  width: 200px;
  position: absolute;
  bottom: 39px;
  right: 0;
  height: 252px;
  z-index: 100;
  background-blend-mode: overlay;
  background-color: #f5f5f5;
  /* background: linear-gradient(to right, transparent, white); */
  /* background-image: url("https://s3.ap-northeast-2.amazonaws.com/engmemo.shop/13.+%E1%84%82%E1%85%A9%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%E1%84%92%E1%85%A7%E1%86%AB%E1%84%92%E1%85%AA%E1%86%BC+%E2%80%93+2.png"); */
  background: linear-gradient(to right, transparent, #fff);
  @media only screen and (max-width: 760px) {
    width: 0px;
  }
  @media only screen and (scroll-right: 0px) {
    display: none;
  }
`;

const MyCropsChartWrap = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: scroll;
  padding-left: 11.5%;
  animation: ${boxFade} 1s;
  @media only screen and (max-width: 1220px) {
    padding-left: 11.5%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (max-width: 760px) {
    padding-left: 5%;
  }
`;

const Div = styled.div`
  margin-bottom: 80px;
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
  @media only screen and (max-width: 760px) {
    bottom: 120px;
    right: 150px;
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
  @media only screen and (max-width: 760px) {
    display: none;
  }
`;

const Emoji = styled.div`
  font-size: 20px;
  margin-right: 4px;
`;

export default MarketPrice;
