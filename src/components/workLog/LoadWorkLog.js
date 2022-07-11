import React,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styled from "styled-components";
import loadWorkLogDB from "../../redux/modules/workLog"
import WorkLogModal from "./WorkLogModal"
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
      <Title> 영농일지 목록</Title>
      <BoxWrap>
        {workLogList !== undefined ? workLogList.map ((list)=>{
          return(
            <WorkLogBox
            onClick={() =>{
                toggleModal()
              }}
            >
        <Content>
          <SmallTitle>작물 </SmallTitle>
          <button>{list.crop}</button>
        </Content>
        <Content>
          <SmallTitle>날짜</SmallTitle>
          <div className="startDate"> 시작일 </div><p>{list.startTime}</p>
          <div className="endDate"> 종료일</div><p>{list.endTime}</p>
        </Content>
        <Content>
          <SmallTitle>농작업</SmallTitle>
          <p>{list.memo}</p>
        </Content>
        <Content>
        <SmallTitle>부자재 사용량</SmallTitle>
          <p> 농약
          {list.subMaterial[0].product}
          {list.subMaterial[0].use}
          </p>
          <p> 비료
          {list.subMaterial[1].product}
          {list.subMaterial[1].use}
          </p>
        </Content>
        <Content>
        <SmallTitle>수확량</SmallTitle>
          <p>{list.harvest}</p>
        </Content>
        <Content>
        <SmallTitle>사진</SmallTitle>
        </Content>

      </WorkLogBox>
           )
          }) : null}
  
      {isOpen && (
        <WorkLogModal 
        isOpen={isOpen}
        toggleModal={toggleModal}
        workLogId={workLogId}
        //workLogList={workLogList}
        />

      )}
     </BoxWrap>
    </Wrap>
  )
}
const Wrap = styled.div`
padding: 30px;`
const Title = styled.div`
font-size : 20px;
font-weight: 700;
margin-bottom: 20px;`
const BoxWrap=styled.div`
display: flex;
flex-wrap: wrap;
justify-content: flex-start;`
const WorkLogBox = styled.div`
width: 30%
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
cursor : pointer;
&:hover {
  box-shadow : 0px 6px 10px rgba(0, 0, 0, 0.15);
}
`
const Content = styled.div`
display : flex
flex-direction : row;
justify-content : space-between`

const SmallTitle = styled.div`
font-size : 18px;
font-weight: 500;
margin : 10px;
`

export default LoadWorkLog;