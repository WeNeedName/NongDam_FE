import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { addWorkLogDB } from "../redux/modules/workLog";

import Work from "../components/workLog/Work";
import WorkPhoto from "../components/workLog/WorkPhoto";
import SubMaterial from "../components/workLog/SubMaterial";
import Harvest from "../components/workLog/Harvest";

// alert 라이브러리
import Swal from "sweetalert2";

const WriteWorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwtToken");
  const refreshToken = sessionStorage.getItem("refreshToken");
  const myCropsList = useSelector((state) => state.users.user?.crops);

  const [title, setTitle] = useState("");
  const [crop, setCrop] = useState("");
  const [date, setDate] = useState(new Date());
  const [workTime, setWorkTime] = useState("");
  const [memo, setMemo] = useState("");
  //const [subMaterial, setSubMaterial] = useState([])

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

  // useEffect(() => {
  //   if (title || crop || date || workTime || memo === null) {
  //     window.alert("빈 칸을 채워주세요");
  //   }
  // }, [message]);

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
    <Container>
      <Header />
      <TotalWrap>
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
      </TotalWrap>
    </Container>
  );
};

const Container = styled.div`
  background-color: #f5f5f5;
`;

const TotalWrap = styled.div`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  justify-content: center;
`;
const TotalTitle = styled.div`
  margin-top: 100px;
  margin-right: 600px;
  font-size: 24px;
  font-weight: 700;
`;
const Wrap = styled.div`
  width: 700px;

  height: 1008px;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  position: relative;
  padding: 30px;
  margin-top: 20px;
`;

const ContentWrap = styled.div`
  padding: 10px;
  width: 80%;
  height: 80vh;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 300px;
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

export default WriteWorkLog;
