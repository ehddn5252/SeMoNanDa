import React, {useState} from 'react'
import {Button, Form, FormGroup, FormLabel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {Link, useNavigate}from 'react-router-dom'
import styled from "styled-components";
import NavBar from '../../../common/navbar/NavBar';

//merge conflict test
//이미지 파일
import light_base from "../../../assets/images/light_base.png"
import Statistics_form_img from "../../../assets/images/Statistics_form_img.png"
import scroll_yellow from "../../../assets/images/두루마기2.png";


//메인페이지 배경화면 Container
const Container = styled.div`
    display: block;
    position: relative;
    width: 100%;
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    background: center;
    background-color: black;
    background-repeat: no-repeat;
    background-image: url(${light_base});
    background-size: cover;
    padding-top:10%;
    padding-bottom:10%`

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



const News = () => {
    
    return (
      <Container id='Container'>
        <NavBar/>
        <LogoWrapper>
              <h1>저잣거리 준비중입니다.</h1>
        </LogoWrapper>
      </Container>
      );
    }
  
export default News;