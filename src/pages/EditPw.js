import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {editPwDB } from "../redux/modules/users";
//testtest

const EditPw = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [oldPw, setOldPw]=useState("")
    const [newPw, setNewPw]=useState("")
    const [newPwCheck, setNewPwCheck]=useState("")
    const [newPwErr, setNewPwErr] = useState(false);
    const [newPwCheckErr, setNewPwCheckErr] = useState(false);
    //비밀번호 검사
    
    const onChangePw = (e) => {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!e.target.value || pwRegex.test(e.target.value)) setNewPwErr(false);
        else setNewPwErr(true);
        if (!newPwErr || e.target.value === newPwErr) setNewPwCheckErr(false);
        else setNewPwCheckErr(true);
        setNewPw(e.target.value);
    };

    //확인용 비밀번호 검사
    
    const onChangePwCheck = (e) => {
        if (e.target.value === newPw) setNewPwCheckErr(false);
        else setNewPwCheckErr(true);
        setNewPwCheck(e.target.value);
    };
    //     console.log(nickname, newPw, address, countryCode)
    const editMyPw = () =>{
        const oldAndNewPws ={
            oldPassword: oldPw,
            newPassword: newPw
        }
        dispatch(editPwDB(oldAndNewPws))
    }
return(
    <>
     <Header />
    <EditPwWrap>
                <p>기존비번</p>
                <input
                 onChange={(e) => {
                    setOldPw(e.target.value)
                 }}
                 placeholder="기존 비밀번호"
                 type="text"
                />
                <p>비번변경</p>
                <input
                 //newPwErr={newPwErr}
                 onChange={(e) => {
                   onChangePw(e);
                 }}
                 placeholder="비밀번호(영문, 숫자 포함 8자 이상)"
                 type="text"
                />
                {newPwErr && (
                 <NewPwErr>비밀번호는 영문, 숫자 포함 8자 이상이여야 합니다.</NewPwErr>
                )}
                
                <p>비번변경확인</p>
                <input
                 //newPwCheckErr={newPwCheckErr}
                 onChange={(e) => {
                   onChangePwCheck(e);
                 }}
                 placeholder="비밀번호 확인"
                 type="text" />
                 {!newPwErr && newPwCheckErr && <NewPwErr>비밀번호가 일치하지 않습니다.</NewPwErr>}

                 <Submit type="submit"
               onClick={()=>{editMyPw(oldPw, newPw)}}   
            >수정하기</Submit>
            </EditPwWrap>
            </>
    )
}
const EditPwWrap = styled.div``
const NewPwErr = styled.div``
const Submit = styled.button``
export default EditPw;