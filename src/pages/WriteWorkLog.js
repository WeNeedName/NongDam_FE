import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
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

const WriteWorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");

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
    if (!title || !crop || !date || !workTime || !memo) {
      window.alert("빈 칸을 채워주세요");
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
        console.log(res);
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
        window.location.assign("/workLog");
      });
    }
  };
  console.log(
    title,
    numberCrop,
    dateFormat,
    memo,
    subMaterial,
    harvest,
    images,
    workTime
  );
  //console.log(workTime)

  return (
    <>
      <Header currentPage="workLog" />
      <Container>
        <TotalTitle>영농일지 작성</TotalTitle>
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
              <SmallTitle className="todo">작업내용</SmallTitle>
              <TodoInput
                type="text"
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
        <FooterNav currentPage="workLog" />
      </Container>
    </>
  );
};

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
`;

const ContentWrap = styled.div`
  /* padding: 10px; */
  width: 100%;
  height: auto;
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
`;

const DoneBtn = styled.button`
  margin-right: 10px;
  width: 80px;
  height: 30px;
  background-color: #22631c;
  color: white;
  border: 1px solid #22631c;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
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
  &::placeholder {
    color: #ddd;
    font-size: 14px;
  }
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

export default WriteWorkLog;
