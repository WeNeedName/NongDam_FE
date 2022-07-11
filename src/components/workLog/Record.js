import {React, useState, useEffect} from 'react'
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { propTypes } from 'react-bootstrap/esm/Image';
import { handleActions } from 'redux-actions';

const Record =(props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [hRecord, setHRecord]=useState();
    
   

    const handleAction = (e) => {
      setHRecord(e.target.value)
    }

    useEffect(()=> {
      props.setHarvest(hRecord);  
    },[handleAction]);
    
    //console.log(hRecord)
    return(     
        <TodoContent>
            <SmallTitle>수확량 기록하기</SmallTitle>
            
            <CategoryBigWrap>
                  
                  <InnerSet>
                    <InputBox className="quantity"
                    type="text"
                    name="quantity"
                    placeholder="kg단위로 입력해주세요" 
                    onChange = {handleAction}/>
                    
                    {/* <Select className="measure"
                    name="unit"
                    onChange={handleAction}>
                    <option value="">단위를 선택해주세요</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                    <option value="kg">kg</option>
                    </Select> */}
                  </InnerSet>
                </CategoryBigWrap>
        </TodoContent>  
      )
}

const TodoContent = styled.div`

width: 93%;
height: 10vh;
background-color: #fff;
`

const SmallTitle = styled.label`
font-size: 1.8em;
font-weight: bold;
`

const CategoryBigWrap = styled.div`
  width: 60%
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;

const InputBox = styled.input``

const InnerSet = styled.div`
display: flex;`

const Select = styled.select`
margin-left: 20px;
width: 170px;
background-color: white;
height: 30px;
border-radius: 10px;
border: 1px solid black;
padding-left: 10px;`




export default Record;