import { flexbox } from '@mui/system';
import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loadWorkLogDB from "../../redux/modules/workLog"

const LoadWorkLog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch
  const [workLogId, setWorkLogId] = useState()
  //모달 열기
  const [isOpen, setOpen] = useState(false);
  function toggleModal(id) {
    setOpen(!isOpen);
    setWorkLogId(id)
  }

  const workLogList = useSelector((state) => state?.workLog?.workLogList);
  console.log(workLogList)
  // useEffect(() => { 
  //   dispatch(loadWorkLogDB())
  // },[])
  
  return(
    <Container>
      <Wrap className="Wrap">
        <TopWrap className="TopWrap">
          <Title className="TotalTitle"> 최근 영농일지</Title>
          <BtnWrap>
            {/* <SearchByCrops></SearchByCrops> */}
            <SearchByDateBtn>날짜로 조회</SearchByDateBtn>
            <WriteBtn
              className = "WriteBtn"
              onClick={()=>{
              navigate("/writeworklog")
              }}> + 기록하기 </WriteBtn>
          </BtnWrap>
        </TopWrap>
        
        <BoxWrap
          className = "BoxWrap">
          {workLogList !== undefined ? workLogList.map ((list)=>{
            return(   
              <WorkLogBox className="WorkLogBox"
              // onClick={() =>{
              //     toggleModal()
              //   }}
              >
              <LeftContent>
              <Content>
                {list.title}
                </Content>
              <Content>
                
                <div className="startDate"></div><p>{list.date}</p>
            
              </Content>
              <Content>
                {/* <SmallTitle>농작업</SmallTitle> */}
                <p>{list.memo}</p>
              </Content>
              <Content>
                <button>{list.crop}</button>
              </Content>
            
              </LeftContent>
              <RightContent>
              <ImgContent>
              <SmallTitle>사진</SmallTitle>
              </ImgContent>
              </RightContent>

        </WorkLogBox>
            )
            }) : null}
      </BoxWrap>
      </Wrap>
    </Container>
  )
}
const Container = styled.div`
display : flex;
justify-content : center;
align-items : center;
`
const Wrap = styled.div`
width : 630px;
padding: 30px;
display : flex;
flex-direction : column;
justify-content : center;
`

const TopWrap = styled.div`
display : flex;
justify-content : space-between;
margin-bottom: 20px;
`

const Title = styled.div`
font-size : 20px;
font-weight: 700;
display : flex;
`
const BtnWrap = styled.div``

const SearchByCrops = styled.button``
const SearchByDateBtn = styled.button`
margin-left : 10px;
padding : 4px 15px;
border-radius : 10px;
font-color : #616161;
border : 1px solid #bfbfbf;
`
const WriteBtn = styled.button`
margin-left : 10px;
padding : 4px 15px;
border-radius : 10px;
color : #ffffff;
background-color : #22631c;
border : 1px solid #22631c;
cursor : pointer;
&:hover {
 opacity :  0.8;
}
`


const BoxWrap=styled.div`
flex-wrap: wrap;
justify-content: flex-start;`

const WorkLogBox = styled.div`
display: grid;
grid-auto-rows: auto;
grid-template-columns : 3fr 1fr;
width: 600px;
height: auto;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
background: #fff
border-radious: 6px;
padding: 15px;
display: inline
flex-direction : row;
justify-content: center;
position : relative;
//cursor : pointer;
// &:hover {
//   box-shadow : 0px 6px 10px rgba(0, 0, 0, 0.15);
// }
`
const LeftContent = styled.div``
const RightContent = styled.div``


const Content = styled.div`
display : flex
flex-direction : row;
justify-content : space-between`


const ImgContent = styled.div`
width : 150px;
height: 150px;
border : 1px solid black`

const SmallTitle = styled.div`
font-size : 18px;
font-weight: 500;
margin : 10px;
`

export default LoadWorkLog;