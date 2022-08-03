import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { addWorkLogDB } from "../redux/modules/workLog";

import Work from "../components/workLog/write/Work";
import WorkPhoto from "../components/workLog/write/WorkPhoto";
import SubMaterial from "../components/workLog/write/SubMaterial";
import Harvest from "../components/workLog/write/Harvest";
import FooterNav from "../components/FooterNav";

// alert 라이브러리
import Swal from "sweetalert2";

// 이미지
import chickenIcon from "../images/chickenIcon.png";
import presentIcon from "../images/presentIcon.png";

const WriteWorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const [isHovering, setIsHovering] = useState(false);

  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState("");
  const [date, setDate] = useState(new Date());
  const [workTime, setWorkTime] = useState("");
  const [memo, setMemo] = useState("");

  const [type0, setType0] = useState(0);
  const [product0, setProduct0] = useState("");
  const [use0, setUse0] = useState("");
  const [unit0, setUnit0] = useState("");
  const usage0 = use0 + unit0;

  const [type1, setType1] = useState(1);
  const [product1, setProduct1] = useState("");
  const [use1, setUse1] = useState("");
  const [unit1, setUnit1] = useState("");
  const usage1 = use1 + unit1;

  const subMaterial0 = {
    type: type0,
    product: product0,
    use: usage0,
  };

  const subMaterial1 = {
    type: type1,
    product: product1,
    use: usage1,
  };

  const subMaterial = [subMaterial0, subMaterial1];

  const [harvest, setHarvest] = useState(0);
  const [images, setImages] = useState("");
  const dateFormat = moment(date).format("YYYY-MM-DD");
  const numberTime = Number(workTime);
  const numberCrop = Number(crop);
  const numberHarvest = Number(harvest);
  const [message, setMessage] = useState(false);

  const addWorkLog = async (event) => {
    if (!title) {
      window.alert("제목을 입력해주세요.");
    } else if (!crop) {
      window.alert("작물을 선택해주세요.");
    } else if (!date) {
      window.alert("날짜를 선택해주세요.");
    } else if (!workTime) {
      window.alert("작업시간을 입력해주세요.");
    } else if (!memo) {
      window.alert("작업 내용을 입력해주세요.");
    } else {
      const data = {
        title: title,
        crop: numberCrop,
        date: dateFormat,
        memo: memo,
        workTime: numberTime,
        subMaterial: subMaterial,
        harvest: numberHarvest,
      };
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      if (images === "") {
        frm.append("images", "");
      } else {
        frm.append("images", images);
      }
      await axios({
        method: "post",
        url: "https://idontcare.shop/worklog",
        data: frm,
        headers: {
          "Content-Type": "multipart/form-data",
          RefreshToken: `Bearer ${refreshToken}`,
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        dispatch(addWorkLogDB(data, images));
        Swal.fire({
          title: "작성이 완료되었습니다.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
          color: "#black",
          padding: "20px",
          width: "400px",
          height: "200px",
        });
        navigate("/workLog");
      });
    }
  };

  return (
    <>
      <Header currentPage="workLog" />
      <Container>
        <TotalTitle>농장일지 작성</TotalTitle>
        <Wrap>
          <ContentWrap>
            <Work
              setTitle={setTitle}
              setCrop={setCrop}
              setDate={setDate}
              setMemo={setMemo}
              setWorkTime={setWorkTime}
            />

            <SubMaterial
              setType0={setType0}
              setProduct0={setProduct0}
              product0={product0}
              setUse0={setUse0}
              use0={use0}
              setUnit0={setUnit0}
              unit0={unit0}
              setType1={setType1}
              setProduct1={setProduct1}
              product1={product1}
              setUse1={setUse1}
              use1={use1}
              setUnit1={setUnit1}
              unit1={unit1}
            />
            <Harvest setHarvest={setHarvest} />
            <CategoryBigWrap>
              <MemoTitleWrap>
                <SmallTitle className="todo">작업내용</SmallTitle>
                <span>최대 500자</span>
              </MemoTitleWrap>

              <TodoInput
                type="text"
                maxLength="500"
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
            </CategoryBigWrap>
            <WorkPhoto setImages={setImages} />
          </ContentWrap>
          <BtnWrap>
            <DoneBtn
              onClick={() => {
                {
                  addWorkLog();
                }
              }}
            >
              작성완료
            </DoneBtn>
            <CancelBtn
              onClick={() => {
                navigate("/worklog");
              }}
            >
              취소
            </CancelBtn>
          </BtnWrap>
        </Wrap>
        <Icon
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          Image={presentIcon}
          chickenIcon={chickenIcon}
          onClick={() => {
            const openNewWindow = window.open("about:blank");
            openNewWindow.location.href =
              "https://docs.google.com/forms/d/e/1FAIpQLSfdZk0LhMOcp8FVaChB2mvIvixRKmY4A_iErl-UsoI0qPJVLg/viewform?usp=sf_link";
          }}
        />
        {isHovering ? (
          <Info>
            <Emoji>🥳 </Emoji> 설문조사 참여하고 치킨받기
          </Info>
        ) : null}
        <FooterNav currentPage="workLog" />
      </Container>
    </>
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
  display: grid;
  grid-template-columns: 1fr minmax(400px, 700px) 1fr;
  background-color: #f5f5f5;
  margin-top: 100px;
`;

const TotalTitle = styled.div`
  grid-column: 2 / 3;
  font-size: 24px;
  font-weight: 700;
  align-self: flex-start;
  @media only screen and (max-width: 760px) {
    font-size: 24px;
    margin-left: 10px;
  }
`;

const Wrap = styled.div`
  grid-column: 2 / 3;
  max-width: 700px;
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 20px;
  position: relative;
  padding: 30px;
  margin-top: 20px;
  margin-bottom: 60px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media only screen and (max-width: 760px) {
    font-size: 14px;
    margin-bottom: 110px;
    border-radius: 0px;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  height: auto;
`;

const MemoTitleWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  span {
    font-size: 12px;
    color: #ccc;
    margin-left: 12px;
    margin-bottom: 2px;
  }
`;

const CategoryBigWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const SmallTitle = styled.label`
  font-size: 18px;
  font-weight: 700;
`;

const BtnWrap = styled.div`
  align-self: flex-end;
  @media only screen and (max-width: 760px) {
    margin-top: 20px;
  }
`;

const DoneBtn = styled.button`
  margin-right: 10px;
  width: 80px;
  height: 30px;
  background-color: #55a349;
  color: white;
  border: 1px solid #55a349;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #22631c;
    border: 1px solid #22631c;
  }
`;

const CancelBtn = styled.button`
  width: 80px;
  height: 30px;
  background-color: transparent;
  color: #616161;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }
`;

const TodoInput = styled.textarea`
  font-family: "Noto Sans KR", sans-serif;
  width: 95%;
  height: 200px;
  resize: none;
  font-size: 14px;
  border: 1px solid #bfbfbf;
  margin-top: 5px;
  border-radius: 10px;
  padding: 8px;
  margin-top: 12px;
  white-space: pre-wrap;
  resize: none;
  &::placeholder {
    color: #ddd;
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border: 1px solid black;
  }
  @media only screen and (max-width: 760px) {
    width: 90%;
  }
`;

const Info = styled.div`
  width: 240px;
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

export default WriteWorkLog;
