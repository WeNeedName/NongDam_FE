import React, {useRef, useState, useEffect} from "react"
import styled from 'styled-components'
import {useDispatch, useSelectior} from "react-redux"
import {signUpDB} from '../redux/modules/users'


const Signup = () =>{
    const dispatch= useDispatch();
    
    const[id, setId] = useState('');
    const[pw, setPw] = useState('');
    const[pwCheck, setPwCheck] = useState('');
    const[nickname, setNickname] = useState('');
    const[name, setName] = useState('');

    const signUp = async () =>{
        const inputs = [id, pw, pwCheck, name, nickname];
        for(let i=0; i<inputs.length;i++){
            if(inputs[i].trim().length <=0){
                return false;
            }
            if(pw.trim() !== pwCheck.trim()){
                return false;
            }
            if(i >= inputs.length -1) {
                const data = {
                    id, pw, pwCheck, nickname
                };
                dispatch(signUpDB(data))
            }
        }    
    }

    return(
        <>
        <h1>회원가입페이지</h1>
        <form>
            <InputBoxes>
                <IdBox> <p>ID</p>
                    <input 
                    className = "inputId"
                    type="text"
                    value={id || ""}
                    onChange={(e) => setId(e.target.value)}
                    />
                </IdBox>
                <PwBox> <p>PW</p> 
                    <input 
                    className = "inputPw"
                    value={pw|| ""}
                    onChange={(e) => setPw(e.target.value)}    
                    />
                </PwBox>
                <PwCheckBox><p>PW 체크</p>
                    <input 
                    className = "inputPwCheck"
                    value={pwCheck|| ""}
                    onChange={(e) => setPwCheck(e.target.value)}
                    />
                </PwCheckBox>
                <NameBox>
                    <p>이름</p>
                    <input 
                    className = "inputName"
                    value={name|| ""}
                    onChange={(e) => setName(e.target.value)}
                    />
                </NameBox>
                <NickNameBox>
                    <p>닉네임</p>
                    <input className = "inputNickName"
                    value={nickname|| ""}
                    onChange={(e) => setNickname(e.target.value)}               
                    />
                </NickNameBox>
            </InputBoxes>
        
        <button
        onClick={signUp}
        
        > 회원가입</button>
        </form>
        
        </>
        
        )
}

const InputBoxes = styled.div`
display: flex;
flex-direction: column;
margin: 10px;

`
const IdBox = styled.div`
display: flex;
margin: 10px;`

const PwBox = styled.div`
display: flex;
margin: 10px;`

const PwCheckBox = styled.div`
display: flex;
margin: 10px;
`

const NameBox = styled.div`
display: flex;
margin: 10px;`

const NickNameBox = styled.div`
display: flex;
margin: 10px;`


export default Signup