import React from 'react'
import {Button, Form, FormGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';
import { useNavigate }from 'react-router-dom'
import styled from "styled-components";
import {modifyUserInfo} from "../../user/UserSlice";
import NavBar from '../../../common/navbar/NavBar';

//이미지 파일
import infobase from "../../../assets/images/dark_base.PNG"
import userform_img from "../../../assets/images/userform_img.png"
import mypage_img from "../../../assets/images/mypage_img.png"
import human from "../../../assets/images/human.png"

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

function MyPage() {
  
  //로컬스토리지 값 파싱해서 가져오기
  let loginInfoString = window.localStorage.getItem("login_user");
  let loginInfo = JSON.parse(loginInfoString);
  
  const dispatch = useDispatch();
  const history = useNavigate();
  
   
  //취소 버튼 누르면 실행되는 함수
  const onCancle = (e) => {
    e.preventDefault();
    history("/profile");
    }

  const onEdit = (e) => {
    e.preventDefault();

    //  마이페이지 수정 내역을 반영하기위해 만드는 유저 객체
    const user_info = {
     id : document.getElementById("input_id").value,
     nickname : document.getElementById("input_nickname").value,
     name : document.getElementById("input_name").value,
     phonenumber : document.getElementById("input_phonenumber").value,
     description : document.getElementById("input_description").value,
    }

    //axios를 통한 DB수정
    dispatch(modifyUserInfo(user_info))
        .then(() => {
            console.log(user_info);
            window.localStorage.setItem("login_user",JSON.stringify(user_info));
            history("/profile");
        })
        .catch((err) => {
            console.log(err);
        })

    }

  return (
    <Container className='ContainerBox'>
      <NavBar/>
      <Form style={{width: "50%", heigth:"100%", textalign:"center",padding:"1em", backgroundImage:`url(${userform_img})`, backgroundSize:"cover", margin: "0 auto", position:"relative", top:"4%"}}>
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
            <Form.Control id="input_id" style={{width: "100%", textalign:"center" ,backgroundColor:"grey"}} defaultValue={loginInfo.id} disabled></Form.Control>
        </FormGroup>
        <FormGroup className='mb-3'>
          <ProfileNicknameNameArea>
            <ProfileDetialInfo>
            <TitleLabel> 별호</TitleLabel>
            <Form.Control id="input_nickname" style={{width: "100%", textalign:"center" ,backgroundColor:"grey"}} defaultValue={loginInfo.nickname} disabled></Form.Control>
            </ProfileDetialInfo>
            <ProfileDetialInfo style={{marginLeft:"1em"}}>
            <TitleLabel> 이름</TitleLabel>
            <Form.Control id="input_name" style={{width: "100%", textalign:"center"}} defaultValue={loginInfo.name}></Form.Control>
            </ProfileDetialInfo>
          </ProfileNicknameNameArea>
        </FormGroup>
        <FormGroup className='mb-3'>
            <TitleLabel> 전화번호</TitleLabel>
            <Form.Control id="input_phonenumber" style={{width: "100%", height:"fit-content", textalign:"center"}} defaultValue={loginInfo.phonenumber}></Form.Control>
        </FormGroup>
        <FormGroup className='mb-0'>
            <TitleLabel> 한줄 소개 </TitleLabel>
            <Form.Control id="input_description" style={{width: "100%", height:"fit-content", textalign:"center"}} defaultValue={loginInfo.description}></Form.Control>
        </FormGroup>
        </ProfileInfoArea>
        </IdBox>
        <FormGroup style={{marginTop: "3em", marginBottom: "3em"}}>
            <Button style={{marginBottom: "1em", width: "100%", backgroundColor:"#8C4D25", border:"0"}} onClick={onEdit} >수정하기</Button>
            <Button style={{marginBottom: "1em", width: "100%", backgroundColor:"grey", border:"0"}} onClick={onCancle}>취소</Button>
        </FormGroup>

      </Form>
    </Container>
    );
  }

export default MyPage;