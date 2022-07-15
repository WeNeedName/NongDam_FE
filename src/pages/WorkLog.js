import {React, useState, useEffect} from 'react'
import Header from "../components/Header";
import LoadWorkLog from "../components/workLog/LoadWorkLog"
import styled from "styled-components";

import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
//import {logOutDB} from '../redux/modules/users'

const WorkLog =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return(
        <Container>
            <Header />
            <LoadWorkLog />
        </Container>
    )
}
const Container = styled.div`
margin-top:100px`

export default WorkLog;