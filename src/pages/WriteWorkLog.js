import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from 'axios'
import {addWorkLogDB} from '../redux/modules/workLog'

import Work from "../components/workLog/Work";
import WorkPhoto from "../components/workLog/WorkPhoto";
import SubMaterial from "../components/workLog/SubMaterial";
import Record from "../components/workLog/Record";


const WriteWorkLog =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = sessionStorage.getItem("jwtToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const myCropsList = useSelector((state) => state.users.user?.crops)

    const [title, setTitle] = useState("")
    const [crop, setCrop] = useState("")
    const [date, setDate] = useState("")
    const [workTime, setWorkTime] = useState("")
    const [memo, setMemo] = useState("")
    //const [subMaterial, setSubMaterial] = useState([])
    
    const [type, setType] = useState(0);
    const [product, setProduct] = useState("");
    const [use, setUse] = useState("");
    const [unit, setUnit] = useState("");
    const usage = use+unit
    
 
    const subMaterial = [{
      type: type,
      product : product,
      use : usage
    }]

    const [harvest, setHarvest] = useState("")
    const [images, setImages] = useState("")    
    const dateFormat = moment(date).format("YYYY-MM-DD")
    const numberTime = Number(workTime)
    const numberCrop = Number(crop)
    const addWorkLog = async (event) => {
      const data = {
              title : title,
              crop : numberCrop,
              date : dateFormat,
              memo : memo,
              workTime : numberTime,
              subMaterial : subMaterial,
              harvest : harvest
      }
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      frm.append("images",images)
      await axios({
        method: "post",
        url: "http://idontcare.shop/worklog",
        data : frm,
        headers : {
          "Content-Type": "multipart/form-data",
          RefreshToken: `Bearer ${refreshToken}`,
          Authorization :  `Bearer ${token}`
        }
      })
      dispatch(
        addWorkLogDB(data, images) 
      )
        .then(
          navigate("/worklog")
      );
      }
      console.log(title, numberCrop, dateFormat, memo, subMaterial, harvest, images, workTime)
      //console.log(workTime)
    
    return(
        <Container>
          <Header />
          <TotalWrap>
            <TotalTitle>
              영농일지 작성
            </TotalTitle>
                <Wrap>
                  <ContentWrap>
                    <Work setTitle={setTitle} setCrop={setCrop} setDate={setDate} setMemo={setMemo} setWorkTime={setWorkTime} />
                    <SubMaterial setType={setType} setProduct={setProduct} setUse={setUse} setUnit={setUnit}
                    />
                    <Record setHarvest={setHarvest}/>
                    <WorkPhoto setImages={setImages}/>
                  </ContentWrap>
                <BtnWrap>
                  <DoneBtn
                  onClick={()=>{
                    addWorkLog()
                  }}>작성완료</DoneBtn>
                  <CancelBtn
                  onClick={()=>{
                    navigate("/worklog")
                  }}>
                    취소
                  </CancelBtn>
                </BtnWrap>
              </Wrap> 
          </TotalWrap>
        </Container>
      
    )
}

const Container = styled.div`
  backgroun-color: #ddd;
`;

const TotalWrap=styled.div`
display : flex;
flex-direction : column;
align-items : center;
text-align: left;
justify-content : center;
`
const TotalTitle = styled.div`
  margin-top : 100px;
  margin-right : 890px;
  font-size: 24px;
  font-weight: 700;
`;
const Wrap = styled.div`
  width: 954px;
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
// padding: 10px; 
// width: 80%;
// height: 80vh;
// background-color: #fff;
`

const BtnWrap = styled.div`
margin-left: 700px;
margin-top: 60px;`

const DoneBtn = styled.button`
  
  margin-right : 10px;
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
background-color : transparent;
color: #616161;
border: 1px solid #bfbfbf;
border-radius: 8px;
&:hover {
  opacity: 0.7;
}`

export default WriteWorkLog;
