import React,{useCallback, useState, useEffect} from 'react'
import {Button, Form, FormGroup, FormLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';
import {useNavigate}from 'react-router-dom'
import styled from "styled-components";
import '../../../common/modal/Modal.css';
import './MyPage.css';
import { modifyPassword } from '../../user/UserSlice';
import NavBar from '../../../common/navbar/NavBar';
import * as GoIcons from 'react-icons/go';

//이미지 파일
import infobase from "../../../assets/images/dark_base.PNG";
import userform_img from "../../../assets/images/userform_img.png";
import mypage_img from "../../../assets/images/mypage_img.png";
import human from "../../../assets/images/human.png";

//컴포넌트
import Modal from "../../../common/modal/Modal";

//메인페이지 배경화면 Container

const Container = styled.div`
    display: block;
    position: relative;
    width: 100%;  
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    background: center;
    background-color: black;
    background-repeat: no-repeat;
    background-image: url(${infobase});
    background-size: cover;
    padding-top: 10%;
    padding-bottom: 10%`


//로고 영역
const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 40%;
  margin: 0 auto;
  margin-bottom: 2em;
  margin-top: 0;
  `
//로고 이미지
const LoginLogo = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 10px;
  margin-top: 3em;
  text-align: top;`

//마이페이지 박스
const IdBox = styled.div`
  border: solid 1px;
  padding: 1em;
  display: flex;
`
//마이페이지 라벨
const TitleLabel = styled.label`
  font-weight: bold;
`
//프로필 이미지 영역
const ProfileImgArea = styled.div`
  width: 30%;
  height: auto;
`
//프로필 이미지
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`
//프로필 정보 영역
const ProfileInfoArea = styled.div`
  width: 70%;
  padding: 1em;
`
//프로필 닉네임, 이름 영역
const ProfileNicknameNameArea = styled.div`
  display: flex;
`

//프로필 세부 영역
const ProfileDetialInfo = styled.div`
  width: 50%;
  display: block;
`

//모달)오류 메세지
const Message = styled.div`
  float: left;
  margin-bottom: 1em;
`

function MyPage() {

  useEffect(() => {
    console.log("hhh");
  },[])
  const dispatch = useDispatch();
  const history = useNavigate();

  //모달)모달관련 state
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOnButton, setIsOnButton] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");

  //모달)모달 내 오류메세지 상태관리 state
  const [checkPasswordMessage, setCheckPasswordMessage] = useState("");
  const [newPasswordMessage, setNewPasswordMessage] = useState("");

  //모달)유효성 검사 후, 상태 저장
  const [isCheckPassword, setIsCheckpassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);

  useEffect(() => {
    if(password!=="" ){

      if(isCheckPassword){
        setIsOnButton(true);
      }
      else{
        setIsOnButton(false);
      }

    }else{
      setIsOnButton(false);
    }

  }, [isCheckPassword, password]);

  //모달)open 동작
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  },[isOpenModal]);

  //모달) 현재 비밀번호 입력
  const onChangePassword = (e) => {

    setPassword(e.target.value);

  }
  //모달) 새 비밀번호 입력 및 유효성 검사
  const onChangeNewPassword = (e) => {
    
    setNewPassword(e.target.value);
    console.log(newPassword);

    //9~16글자 작성가능
    if(e.target.value.length <9 || e.target.value.length >16){
        setNewPasswordMessage('9~16글자로 입력해주세요')
        setIsNewPassword(false)
    } else {
        setNewPasswordMessage('확인되었습니다.')
        setIsNewPassword(true)
    }
  }

  //모달) 새 비밀번호 확인 입력 및 일치여부 확인
  const onChangeCheckNewPassword = (e) => {

    setCheckNewPassword(e.target.value);
    console.log(checkNewPassword);
    //비밀번호와 비밀번호 확인이 다른경우
    if(newPassword !== e.target.value){
      setCheckPasswordMessage('입력값이 일치하지 않습니다.')
      setIsCheckpassword(false)
   } else {
      setCheckPasswordMessage('확인되었습니다.')
      setIsCheckpassword(true)
    }

  }

  //모달) 비밀번호 변경 누르면 실행하는 동작
  const onConfirmChangePassword = (e) => {
    e.preventDefault();
    const data = {
      id: loginInfo.id,
      password: password,
      newPassword: newPassword,
    }
    console.log(data);
    dispatch(modifyPassword(data))
      .then((respnose) => {

        if(respnose.payload.status === 200){
          alert("변경완료 되었습니다.");
          setOpenModal(false);
          //상태값초기화
          setCheckPasswordMessage("");
          setNewPasswordMessage("");
          setIsCheckpassword(false);
          setIsNewPassword(false);
        }else if(respnose.payload.status === 403){
          alert("현재 비밀번호가 일치하지 않습니다.")
        };
      })
  }
  //모달) 닫기 버튼 누르면 실행하는 동작
  const onCloseModal = (e) => {
    e.preventDefault();
    setOpenModal(false);
    //상태값초기화
    setCheckPasswordMessage("");
    setNewPasswordMessage("");
    setIsCheckpassword(false);
    setIsNewPassword(false);
  }
  
  //로컬스토리지 
  let loginInfoString = window.localStorage.getItem("login_user");
  let loginInfo = JSON.parse(loginInfoString);

  //전화번호 파싱함수
  function parsePhonenumber(phonenumber){
    let resultNumber = [];
    let first = "";
    let second = ""
    let third = "";
    if(phonenumber !== null){
     if( phonenumber.length === 11){
        first = phonenumber.substring(0,3);
        second = phonenumber.substring(3,7);
        third = phonenumber.substring(7,11);      
    }
  }
    resultNumber.push(first);
    resultNumber.push(second);
    resultNumber.push(third);

    return resultNumber.filter((val) => val).join("-");
  }

  //파싱된 전화번호
  const parsedPhonenumber = parsePhonenumber(loginInfo.phonenumber);
  
  //회원정보 수정 버튼 누르면 실행되는 함수
  const onEditPage = (e) => {
    e.preventDefault();
    history("/editprofile");
  }

  //뒤로가기(X모양) 버튼 클릭 시, 동작 함수
  function onCloseButton() {
    window.history.back();
  }

  return (
    <Container id='Container'>
      <NavBar/>
      <Form style={{width: "50%", heigth:"fit-content", textalign:"center",padding:"1em", backgroundImage:`url(${userform_img})`, backgroundSize:"cover", margin: "0 auto", position:"relative", top:"4%"}}>
      <GoIcons.GoX id="closeButton" size="30px" style={{float:"right",marginTop:"1em", marginRight:"1em"}} onClick={onCloseButton}></GoIcons.GoX>  
      <LogoWrapper>
          <LoginLogo src={mypage_img}></LoginLogo>
        </LogoWrapper>
        <IdBox>
        <ProfileImgArea>
          <ProfileImg  src={human}/>
        </ProfileImgArea>
        <ProfileInfoArea>

        <FormGroup className='mb-3'>
            <TitleLabel> 아이디</TitleLabel>
            <FormLabel style={{width: "100%", textalign:"center"}}>{loginInfo.id}</FormLabel>
        </FormGroup>
        <FormGroup className='mb-3'>
          <ProfileNicknameNameArea>
            <ProfileDetialInfo>
            <TitleLabel> 별호</TitleLabel>
            <FormLabel style={{width: "100%", textalign:"center"}}>{loginInfo.nickname}</FormLabel>
            </ProfileDetialInfo>
            <ProfileDetialInfo>
            <TitleLabel> 이름</TitleLabel>
            <FormLabel style={{width: "100%", textalign:"center"}}>{loginInfo.name}</FormLabel>
            </ProfileDetialInfo>
          </ProfileNicknameNameArea>
        </FormGroup>
        <FormGroup className='mb-3'>
            <TitleLabel> 전화번호</TitleLabel>
            <FormLabel style={{width: "100%", height:"fit-content", textalign:"center"}}>{parsedPhonenumber}</FormLabel>
        </FormGroup>
        <FormGroup>
            <TitleLabel> 한줄 소개 </TitleLabel>
            <FormLabel style={{width: "100%", height:"fit-content", textalign:"center"}}>{loginInfo.description}</FormLabel>
        </FormGroup>
        </ProfileInfoArea>
        </IdBox>
        <FormGroup style={{marginTop: "3em", marginBottom: "3em"}}>
            <Button style={{marginBottom: "3em", width: "100%", backgroundColor:"#8C4D25", border:"0"}} onClick={onEditPage}>회원정보 수정</Button>
            <Button style={{marginBottom: "1em", width: "100%", backgroundColor:"#CC8960",border:"0"}} onClick={onClickToggleModal}>비밀번호 변경</Button>
        </FormGroup>
        
      {isOpenModal&& (
      <Modal onClickToggleModal={onClickToggleModal}>
        <FormGroup className='mb-3'>
            <FormLabel style={{float:"left"}}> 현재 비밀번호 </FormLabel>
            <Form.Control style={{width: "100%", textalign:"center"}} type="password" onChange={onChangePassword}/>
        </FormGroup>
        <FormGroup className='mb-3'>
            <FormLabel style={{float:"left"}}> 새로운 비밀번호</FormLabel>
            <Form.Control style={{width: "100%", textalign:"center"}} type="password" onChange={onChangeNewPassword}/>
            {newPassword.length > 0 && <Message className={`message${isNewPassword ? 'success' : 'error'}`}>{newPasswordMessage}</Message>}
        </FormGroup>
        <FormGroup className='mb-3'>
            <FormLabel style={{float:"left"}}> 새로운 비밀번호 확인</FormLabel>
            <Form.Control style={{width: "100%", textalign:"center"}} type="password" onChange={onChangeCheckNewPassword}/>
            {checkNewPassword.length > 0 && <Message className={`message${isCheckPassword ? 'success' : 'error'}`}>{checkPasswordMessage}</Message>}
        </FormGroup>
        <FormGroup style={{marginTop: "3em", marginBottom: "3em"}}>
          {isOnButton ? <Button style={{marginBottom: "1em",  width: "100%", backgroundColor:"#8C4D25", border:"0"}} onClick={onConfirmChangePassword}>비밀번호 변경</Button>
          : <Button style={{marginBottom: "1em",  width: "100%", backgroundColor:"#8C4D25", border:"0"}} onClick={onConfirmChangePassword} disabled>비밀번호 변경</Button>}
            <Button style={{marginBottom: "1em",  width: "100%", backgroundColor:"grey", border:"0"}} onClick={onCloseModal}>취소</Button>
        </FormGroup>
      </Modal>
      )}
      </Form>
    </Container>
    );
  }

export default MyPage;