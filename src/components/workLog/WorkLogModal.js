import React from "react"
import styled from "styled-components"
import Modal from "styled-react-modal"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const WorkLogModal = ({
  isOpen,
  toggleModal,
  workLogId,
  //workLogList
}) =>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  
  return(
    null
  )
}
export default WorkLogModal;

