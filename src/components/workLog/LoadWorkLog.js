import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import loadWorkLogDB from "../../redux/modules/workLog"

const LoadWorkLog = () => {
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
    <Wrap>
      <TopWrap>
        <Title> 영농일지</Title>

      </TopWrap>
      
      <BoxWrap>
        {workLogList !== undefined ? workLogList.map ((list)=>{
          return(   
            <WorkLogBox
            // onClick={() =>{
            //     toggleModal()
            //   }}
            >
            <LeftContent>
            <Content>
              {list.title}
              </Content>
            <Content>
              <SmallTitle>날짜</SmallTitle>
              <div className="startDate"></div><p>{list.date}</p>
           
            </Content>
            <Content>
              <SmallTitle>농작업</SmallTitle>
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
  )
}
const Wrap = styled.div`
padding: 30px;`

const TopWrap = styled.div``
const Title = styled.div`
font-size : 20px;
font-weight: 700;
margin-bottom: 20px;`
const BoxWrap=styled.div`
flex-wrap: wrap;
justify-content: flex-start;`

const WorkLogBox = styled.div`
display: grid;
grid-auto-rows: auto;
grid-template-columns : 3fr 1fr;
width: 500px;
height: auto;
box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
background: #fff
border-radious: 6px;
margin : 20px;
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
display : flex
flex-direction : row;
justify-content : space-between`

const SmallTitle = styled.div`
font-size : 18px;
font-weight: 500;
margin : 10px;
`

export default LoadWorkLog;