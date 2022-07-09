import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const Record =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(     
        <TodoContent>
            <SmallTitle>수확량 기록하기</SmallTitle>
      
        </TodoContent>  
      )
}

const TodoContent = styled.div`
padding: 20px; 
width: 93%;
height: 40vh;
background-color: #fff;
`

const SmallTitle = styled.label`
font-size: 1.8em;
font-weight: bold;
`


export default Record;