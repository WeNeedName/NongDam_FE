import {React, useState, useEffect} from 'react'
import Header from "../components/Header";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import {logOutDB} from '../redux/modules/users'

const MyPage =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const isLogin = sessionStorage.getItem("jwtToken")
    //console.log(isLogin)
    // function logOut()
    // {
    //     sessionStorage.clear()
    //     navigate("/");
    // }
    return(
        <div>
            <Header />
            <Container>
                <p>마이페이지입니다.</p>
                <p onClick={() => {
                    navigate("/editmemberinfo")
                }}>회원정보 수정</p>

                <p onClick={() => {
                    navigate("/editpw")}}>비밀번호 변경</p>

                <button 
                onClick={() => {
                    dispatch(logOutDB())
                }}>로그아웃</button>
            </Container>        
        
        
        
        
        </div>
    )
}
const Container = styled.div`
margin-top:100px`
export default MyPage;