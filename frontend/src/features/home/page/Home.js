import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import styled from "styled-components";
import {Link} from "react-router-dom";
import homebase from "../../../assets/images/homebase.png"
import homelogo from "../../../assets/images/homelogo.png"
import NavBar from "../../../common/navbar/NavBar";
import'../../../common/navbar/NavBar.css'
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
    background-image: url(${homebase});
    background-size: cover; 
    padding-top:10%;
    padding-bottom:10%
    `

//Container 이분할
const Section = styled.div`
    width: 100%;
    height: 50%;
    float: left;`

//로고 영역
const LogoWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  `
//로고 세부 영역
const SecondLogoWrapper = styled.div`
  align-self: self-start;
  margin-top: -1em;`

//로고 이미지
const Logo = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 10px;
  text-align: top;`


//논쟁 시작 버튼 영역
const ArguementGroup = styled.div`
  display: flex;
  margin: 0 auto;
  width: 40%;
  justify-content: space-between;
  position: absolute;
  bottom: 3em;
  left: 30%;
`

//공식 경연 버튼
const OfficialButton = styled.button`
font-family: JSArirangHON;
    position: relative;
    border: none;
    min-width: 200px;
    min-height: 50px;
    background: linear-gradient(
        90deg,
        rgb(70, 70, 185) 0%,
        rgb(40, 40, 220) 100%
    );
    border-radius: 1000px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    box-shadow: 12px 12px 24px rgb(175, 175, 235);
    font-weight: 500;
    transition: 0.3s;
    font-size: 40px;
`
//자유 경연 버튼
const FreeButton = styled.button`
font-family: JSArirangHON;
    position: relative;
    border: none;
    min-width: 200px;
    min-height: 50px;
    background: linear-gradient(
      90deg,
      rgb(65, 165, 65) 0%,
      rgb(50, 135, 45) 100%
      );
      border-radius: 1000px;
      color: rgb(255, 255, 255);
      cursor: pointer;
      box-shadow: 12px 12px 24px rgb(180, 235, 170);
      font-weight: 500;
      transition: 0.3s;
      font-size: 40px;
`



function Home() {
    const isHome =true;
    
    return (
        
            <Container id="Container">
                
            <NavBar isHome={isHome}/>
                <Section>
                <LogoWrapper>
                    <SecondLogoWrapper>
                        <Logo src={homelogo}></Logo>
                    </SecondLogoWrapper>
                </LogoWrapper>
                </Section>

                <Section>
                <ArguementGroup>
                    <Link to="/rank"><OfficialButton className="formula">공식 경연</OfficialButton></Link>
                    <Link to="/custom"><FreeButton className="custom">자유 경연</FreeButton></Link>
                </ArguementGroup>
                </Section>

            </Container>
    );
}

export default Home;