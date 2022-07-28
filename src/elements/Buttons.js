import styled from "styled-components";

export const SubmitBtn = styled.button`
  margin-top: 20px;
  /* font-size: 11px; */
  color: white;
  background-color: #55a349;
  border: 1px solid #55a349;
  padding: 4px 10px;
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
  /* font-size: 11px; */
  color: #616161;
  background-color: transparent;
  border: 1px solid #bfbfbf;
  padding: 4px 10px;
  border-radius: 8px;
  margin-left: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
