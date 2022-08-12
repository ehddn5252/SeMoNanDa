import React, {useState} from 'react'
import {Button, Form, FormGroup, FormLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from 'react-redux';
import {Link, useNavigate}from 'react-router-dom'
import {login, loadUser} from '../UserSlice';
import styled from "styled-components";
import NavBar from '../../../common/navbar/NavBar';

import * as GoIcons from 'react-icons/go';
//이미지 파일
import darkbase from "../../../assets/images/dark_base.PNG"
import userform_img from "../../../assets/images/userform_img.png"
import login_img from "../../../assets/images/login_img.png"


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
    background-image: url(${darkbase});
    background-size: cover;
    padding-top: 13%;
    padding-bottom: 10%`

//로고 영역
const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 20%;
  margin: 0 auto;
  margin-bottom: 2em;
  `
//로고 이미지
const LoginLogo = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 10px;
  margin-top: 3em;
  text-align: top;`

//링크
const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
}
`

function Login() {
  
  const dispatch = useDispatch();
  const history = useNavigate();
  
  //id
  const [userId, setId] = useState("");
  //password
  const [password, setPassword] = useState(""); 
  //오류메세지 상태 저장
  const [errorMessage, setErrorMessage] = useState('')

  //Idhandler
  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  }

  //Passwordhandler
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }

  //로그인 버튼 누르면 실행되는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      userId,
      password,
    };
    dispatch(login(data))
    
    .then((response) => {
        if(response.payload.status === 200){

          dispatch(loadUser(data.userId))
            .then((response) => {

              const response_user = response.payload;
              const login_user = {
                id: response_user.id,
                nickname: response_user.nickname,
                name: response_user.name,
                phonenumber: response_user.phonenumber,
                description: response_user.description,
              }
              window.location.reload();
              window.localStorage.setItem('login_user',JSON.stringify(login_user));
            })

          history('/');
        }else{
          if (response.payload === 400) {
            setErrorMessage('입력한 정보를 다시 확인해주세요😥');
          } else if (response.payload === 409) {
            setErrorMessage('이미 로그인된 사용자입니다😥');
          } else if (response.payload === 401 || response.payload === 500) {
            setErrorMessage('아이디와 비밀번호를 다시 확인해주세요😥');
            history('/login');
          }
        }
      })
  }

  //뒤로가기(X모양) 버튼 클릭 시, 동작 함수
  function onCloseButton() {
    history("/");
  }

  return (
    <Container id='Container'>
      <NavBar/>
      <Form style={{width: "50%", textalign:"center",padding:"0.5em", backgroundImage:`url(${userform_img})`, backgroundSize:"cover", margin: "0 auto", position:"relative"}}>
      <GoIcons.GoX id="closeButton" size="30px" style={{float:"right", marginTop:"1em", marginRight:"1em"}} onClick={onCloseButton}></GoIcons.GoX>
        <LogoWrapper>
          <LoginLogo src={login_img}></LoginLogo>
        </LogoWrapper>
        <FormGroup className='mb-3'>
            <FormLabel style={{marginLeft: "25%"}}> 아이디</FormLabel>
            <Form.Control style={{width: "50%", textalign:"center", margin:"0 auto"}} name="userId" type="id" placeholder="아이디" value={userId} onChange={onIdHandler}/>
        </FormGroup>
        <FormGroup className='mb-3'>
            <FormLabel style={{marginLeft: "25%"}}> 비밀번호</FormLabel>
            <Form.Control style={{width: "50%", textalign:"center", margin:"0 auto", marginBottom:"0.5em"}} name="password" type="password" placeholder="비밀번호" value={password} onChange={onPasswordHandler}/>
            {userId.length > 0 && <span style={{animation:"motion 0.3s linear 0s infinite alternate", color:"red", marginLeft:"25%", marginTop:"1em"}}>{errorMessage}</span>}
        </FormGroup>
        <FormGroup style={{marginTop: "3em", marginBottom: "3em"}}>
            <Button style={{marginBottom: "1em", marginLeft: "25%", width: "50%", backgroundColor:"#8C4D25", border:"0"}} type="submit" onClick={onSubmit}>로그인</Button>
            <StyledLink to={"/signin"}><Button style={{marginBottom: "1em", marginLeft: "25%", width: "50%", backgroundColor:"#CC8960", border:"0"}}>회원가입</Button></StyledLink>
        </FormGroup>
      </Form>
    </Container>
    );
  }

export default Login;
