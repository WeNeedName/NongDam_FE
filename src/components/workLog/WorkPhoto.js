import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
//import {logOutDB} from '../redux/modules/users'

const WorkPhoto =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <Container>
          
         <p>사진</p>
       
        
        
        </Container>
    )
}
const Container = styled.div`
margin-top:100px`
export default WorkPhoto;