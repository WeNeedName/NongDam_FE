import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {getInfoDB} from "../redux/modules/users"

const EditMemberInfo =() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [nickname, setNickname]=useState("")
    const [crops, setCrops]=useState("")
    const [pw, setPw]=useState("")
    const [pwCheck, setPwCheck]=useState("")
    const [address, setAddress]=useState("")
    const [countryCode, setCountryCode] = useState()
    const [img, setImg]=useState("")

    useEffect (() => {
        dispatch(getInfoDB())
    },[]);
    
    const user = useSelector(state => state.users?.user)
    console.log(user)
  




    //const userInfo = useSelector((state) => state.userInfo)
    
    

    return(
        <div>
            <Header />
            <div>
            <h1>회원정보수정</h1>

            <EditNameWrap>
                <p>이름수정</p>
                <input></input>    
            </EditNameWrap>
            
            <EditPwWrap>
                <p>비번변경</p>
                <input></input>
                <p>비번변경확인</p>
                <input></input>        
            </EditPwWrap>
            <RegisterAdress>
                <p>농장 주소 등록</p>
                <input></input>        
            </RegisterAdress>
            <EditMyCrops>
                <p> 내 작물 수정</p>
                <input></input>        
            </EditMyCrops>
            <AddProfile>
                <p>프로필 사진 등록</p>
                <input type="file"></input>          
            </AddProfile>  
               <Submit type="submit">수정하기</Submit>
            </div>
        </div>
    )
}

const EditNameWrap = styled.div``
const EditPwWrap = styled.div``
const RegisterAdress = styled.div``
const EditMyCrops = styled.div``
const AddProfile = styled.div``
const Submit = styled.button`
margin-top: 20px;`

export default EditMemberInfo;