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
    const myCropsList = useSelector((state) => state.users.user?.crops)

    const [crop, setCrop] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [memo, setMemo] = useState("")
    const [subMaterialC, setSubMaterialC] = useState([])
    const [subMaterialF, setSubMaterialF] = useState([])
    const [harvest, setHarvest] = useState("")
    const [images, setImages] = useState("")
    const mySubMaterial = []
    mySubMaterial.push(subMaterialC, subMaterialF)
    const startTimeFormat = moment(startTime).format("YYYY-MM-DD HH:mm")
    const endTimeFormat = moment(endTime).format("YYYY-MM-DD HH:mm")
    
    const addWorkLog = async () => {
      const data = {
              crop : crop,
              startTime : startTimeFormat,
              endTime : endTimeFormat,
              memo : memo,
              subMaterial : mySubMaterial,
              harvest : harvest
      }
      let frm = new FormData();
      frm.append("data", JSON.stringify(data));
      frm.append("Images",images)
      await axios({
        method: "post",
        url: "http://idontcare.shop/worklog",
        data : frm,
        headers : {
          "Content-Type": "multipart / form-data",
          Autorization :  `Bearer ${token}`,
        }
      })
      dispatch(
        addWorkLogDB(data) //api연결은 직접 하니까, 리덕스 저장하는 건 액션생성함수 createWorkLog 써도 되는 부분인가???
      )
        .then(
          navigate("/worklog")
      );
      
      }
    console.log(crop, startTimeFormat, endTimeFormat, memo, mySubMaterial, harvest, images)
    
    
    return(
        <Container>
          <Header />
            <Wrap>
              <TotalTitle>
                작업일지등록하기
              </TotalTitle>
              <ContentWrap>
                <Work setCrop={setCrop} setStartTime={setStartTime} setEndTime={setEndTime} setMemo={setMemo} />
                <SubMaterial setSubMaterialC={setSubMaterialC} setSubMaterialF={setSubMaterialF}/>
                <Record setHarvest={setHarvest}/>
                <WorkPhoto setImages={setImages}/>
              </ContentWrap>
              <DoneBtn
              onClick={()=>{
                // addWorkLog()
              }}>작성완료</DoneBtn>
            </Wrap> 
        </Container>
    )
}

const Container = styled.div`
  backgroun-color: #ddd;
`;

const Wrap = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: white;
  border-radius: 20px;
  position: relative;
  padding: 30px;
  margin-top: 100px;
`;
const TotalTitle = styled.label`
  font-size: 2rem;
  font-weight: bold;
`;
const ContentWrap = styled.div`

padding: 10px; 
width: 80%;
height: 80vh;
background-color: #fff;
`
const Submit = styled.button`
  margin-top: 20px;
`;
const Button = styled.button``


const DoneBtn = styled.button`
  margin-top: 200px;
  
  width: 300px;
  height: 40px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.7;
  }

`;

export default WriteWorkLog;
