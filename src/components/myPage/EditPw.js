import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { SubmitBtn } from "../../elements/Buttons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editPwDB } from "../../redux/modules/users";

const EditPw = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const [newPwErr, setNewPwErr] = useState(false);
  const [newPwErr2, setNewPwErr2] = useState(false);
  const [newPwCheckErr, setNewPwCheckErr] = useState(false);

  const userInfo = useSelector((state) => state.users.user);

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

  console.log(oldPw, newPw);
  const editMyPw = () => {
    const oldAndNewPws = {
      oldPassword: oldPw,
      newPassword: newPw,
    };
    dispatch(editPwDB(oldAndNewPws));
  };

  return (
    <Wrap>
      <Title>비밀번호 변경</Title>
      <EditPwWrap>
        <EachBoxWrap>
          <SmallTitle>현재 비밀번호</SmallTitle>
          <form>
            <PwInputBox
              onChange={(e) => {
                setOldPw(e.target.value);
              }}
              //placeholder="기존 비밀번호"
              type="password"
              autocomplete="current-password"
              autocapitalize="off"
            />
          </form>
        </EachBoxWrap>
        <EachBoxWrap>
          <SmallTitle>새로운 비밀번호</SmallTitle>
          <form>
            <PwInputBox
              //newPwErr={newPwErr}
              onChange={(e) => {
                onChangePw(e);
              }}
              //placeholder="비밀번호(영문, 숫자 포함 8자 이상)"
              type="password"
              autocomplete="new-password"
              autocapitalize="off"
            />
          </form>
          {newPwErr && (
            <NewPwErr>
              비밀번호는 영문, 숫자 포함 8자 이상이여야 합니다.
            </NewPwErr>
          )}
          {newPwErr2 && <NewPwErr>기존 비밀번호와 같습니다.</NewPwErr>}
        </EachBoxWrap>
        <EachBoxWrap>
          <SmallTitle>새로운 비밀번호 확인</SmallTitle>
          <form>
            <PwInputBox
              //newPwCheckErr={newPwCheckErr}
              onChange={(e) => {
                onChangePwCheck(e);
              }}
              //placeholder="비밀번호 확인"
              type="password"
              autocomplete="new-password"
              autocapitalize="off"
            />
          </form>

          {!newPwErr && newPwCheckErr && (
            <NewPwErr>비밀번호가 일치하지 않습니다.</NewPwErr>
          )}
        </EachBoxWrap>
        <SubmitBtn
          type="submit"
          onClick={() => {
            editMyPw();
          }}
          style={{
            marginLeft: "600px",
          }}
          disabled={
            !oldPw ||
            !newPw ||
            !newPwCheck ||
            newPwErr ||
            newPwErr2 ||
            newPwCheckErr
              ? true
              : false
          }
        >
          변경하기
        </SubmitBtn>
      </EditPwWrap>
    </Wrap>
  );
};
const Wrap = styled.div`
  border: none;
  width: 100%;
  height: auto;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  background: #ffffff;
  padding: 40px 40px 40px 40px;
  grid-column: 3 / 5;
  @media only screen and (max-width: 760px) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
  }
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
`;
const EditPwWrap = styled.div`
  margin-top: 70px;
`;
const PwInputBox = styled.input`
  border: 1px solid #999999;
  border-radius: 8px;
  font-size: 16px;
  padding: 4px;
  width: 300px;
  height: 28px;
  margin-top: 5px;
  :focus {
    outline: none;
  }
`;
const SmallTitle = styled.div`
  font-size: 13px;
`;

const NewPwErr = styled.div`
  margin-top: 6px;
  color: #666666;
`;

const EachBoxWrap = styled.div`
  margin-bottom: 20px;
`;

const Submit = styled.button``;
export default EditPw;
