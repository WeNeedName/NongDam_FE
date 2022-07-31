import styled from "styled-components";

export const SubmitBtn = styled.button`
  margin-top: 20px;
  font-size: 16px;
  color: white;
  background-color: #55a349;
  border: 1px solid #55a349;
  padding: 6px 14px;
  border-radius: 8px;
  margin-left: 18px;
  cursor: pointer;
  &:hover {
    background: #22631c;
    border: 1px solid #22631c;
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const CancelBtn = styled.button`
  margin-top: 20px;
  font-size: 16px;
  color: #616161;
  background-color: transparent;
  border: 1px solid #bfbfbf;
  padding: 6px 14px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    color: black;
    border: 1px solid black;
  }
`;
