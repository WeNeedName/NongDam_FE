import {React, useState, useEffect} from 'react'
import Header from "../components/Header";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
//import {logOutDB} from '../redux/modules/users'

import Work from "../components/workLog/Work";
import WorkPhoto from "../components/workLog/WorkPhoto";
import SubMaterial from "../components/workLog/SubMaterial";
import Record from "../components/workLog/Record";

const WriteWorkLog =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return(
        <Container>
          <Header />
            <Wrap>
              <TotalTitle>
                작업일지등록하기
              </TotalTitle>
              <ContentWrap>
                <Work />
                <SubMaterial />
                {/* <Record /> */}
                {/* <WorkPhoto />*/}
              </ContentWrap>
            </Wrap>
        </Container>
    )
}
const Container = styled.div`
  backgroun-color: #ddd`


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
`
const TotalTitle = styled.label`
font-size: 2rem;
font-weight: bold;
`
const ContentWrap = styled.div`
padding: 10px; 
width: 80%;
height: 80vh;
background-color: #fff;
`


export default WriteWorkLog;