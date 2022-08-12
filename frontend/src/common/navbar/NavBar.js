import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
//import { CgProfile } from "react-icons/cg";
import logo from '../../assets/images/logo.png';
import styled from "styled-components";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import * as BiIcons from 'react-icons/bi';
import * as RiIcons from 'react-icons/ri';
import * as GoIcons from 'react-icons/go';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getToken, deleteToken, saveToken } from '../../common/api/JWT-common';
import { Dropdown, NavDropdown } from "react-bootstrap";

const LogoAndButtonArea = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  justify-content: space-between;
`

const SelectedFormulaButton = styled.button`
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

const UnselectedFormulaButton = styled.button`
font-family: JSArirangHON;
    position: relative;
    border: none;
    min-width: 200px;
    min-height: 50px;
    background: linear-gradient(
      90deg,
      rgb(139, 142, 139) 0%,
      rgb(76, 78, 76) 100%
      );
    border-radius: 1000px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    box-shadow: 12px 12px 24px rgb(139, 142, 139);
    font-weight: 500;
    transition: 0.3s;
    font-size: 40px;
`

const SelectedCustomButton = styled.button`
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
const UnselectedCustomButton = styled.button`
 font-family: JSArirangHON;
    position: relative;
    border: none;
    min-width: 200px;
    min-height: 50px;
    background: linear-gradient(
      90deg,
      rgb(139, 142, 139) 0%,
      rgb(76, 78, 76) 100%
      );
      border-radius: 1000px;
      color: rgb(255, 255, 255);
      cursor: pointer;
      box-shadow: 12px 12px 24px rgb(139, 142, 139);
      font-weight: 500;
      transition: 0.3s;
      font-size: 40px;
`

function NavBar(props) {

  const history = useNavigate();

  //Scroll이벤트 state값 저장
  const [scroll, setScroll] = useState(window.scrollY);

  //Scroll이벤트 발생시마다 갱신하고, 이벤트 함수호출
  useEffect(() => {
    setScroll(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
  },[scroll]);

  const handleScroll = () => {

    //Scroll에 따른 Navbar 색변경
    const opcity = 0 + (window.scrollY/document.getElementById("header_nav").clientHeight)*0.4;
    document.getElementById('header_nav').style.backgroundColor =`rgb(255,255,255,${opcity}`;
    
    //Scroll에 따른 HamburgerButton 색 변경
    if(opcity === 0){
      document.getElementById('HamburgerMenu').style.color=`ghostwhite`
    }else{
      document.getElementById('HamburgerMenu').style.color=`rgb(0,0,0,${opcity})`
    }
  };

  //로컬스토리지 
  let loginInfoString = window.localStorage.getItem("login_user");
  let loginInfo = JSON.parse(loginInfoString);
  
  const token = getToken();


  const Logo = styled.img`
    width: 11vh;
    height: 11vh;
  `
  const logoutHandler = async () => {
    await saveToken("");
    window.localStorage.removeItem("login_user");
    history('/');
  }

  const myPageHandler = () => {
    history('/profile');
  }
  return (
    <>
      {[false].map((expand) => (
        <Navbar id="header_nav" key={expand} expand={expand} className="navbar mb-3" style={{zIndex:"2",position:"fixed", top:"0",width:"100%", textAlign:"center"}}>
          <Container>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} style={{border:"0"}}>
              <GiIcons.GiHamburgerMenu id="HamburgerMenu" color="ghostwhite" size="30px" />
          </Navbar.Toggle>
          {props.isHome ?
              (<Link to="/"><Logo className="logo" src={logo} /></Link>)
              :
            (
            <LogoAndButtonArea>
              {props.isRank ? 
              (<div style={{display: "contents", alignItems: "center",  width: "60%", justifyContent: "space-between"}}>
              <Link to="/rank"><SelectedFormulaButton className="formula">공식경연</SelectedFormulaButton></Link>  
              <Link to="/"><Logo className="logo" src={logo} /></Link>
              <Link to="/custom"><UnselectedCustomButton className="custom">자유경연</UnselectedCustomButton></Link>
              </div>)
              :( props.isCustom ?
                (
                <div style={{display: "contents", alignItems: "center",  width: "60%", justifyContent: "space-between"}}>
                <Link to="/rank"><UnselectedFormulaButton className="formula">공식경연</UnselectedFormulaButton></Link>  
                <Link to="/"><Logo className="logo" src={logo} /></Link>
                <Link to="/custom"><SelectedCustomButton className="custom">자유경연</SelectedCustomButton></Link>
                </div>
                )
                :
                (
                  <div style={{display: "contents", alignItems: "center",  width: "60%", justifyContent: "space-between"}}>
                <Link to="/rank"><SelectedFormulaButton className="formula">공식경연</SelectedFormulaButton></Link>  
                <Link to="/"><Logo className="logo" src={logo} /></Link>
                <Link to="/custom"><SelectedCustomButton className="custom">자유경연</SelectedCustomButton></Link>
              </div>
                )
              )
              }
            </LogoAndButtonArea>
            )
          }
              {token ?
               (
                  <Dropdown align={"start"}>   
                  {/* <CgProfile className="profile" color="black" size="50" onClick={logoutHandler}></CgProfile> */}
                    <Dropdown.Toggle variant="Secondary" style={{backgroundColor: "#4A4A4A", color: "white", fontWeight:"bold"}}>
                      {loginInfo.nickname}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant="dark" style={{float:"right", textAlign:"center"}}>
                     <Dropdown.Item onClick={logoutHandler}>로그아웃</Dropdown.Item>
                     <Dropdown.Divider/>
                     <Dropdown.Item onClick={myPageHandler}>마이페이지</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
               ):
               (<Link to="/login"><button className="btn-login">로그인</button></Link>)
              }
              {/* <Link to="/myPage"><CgProfile className="profile" color="black" size="50"></CgProfile></Link> */}
              
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <Link to="/"><Logo className="logoImg logo justify-content-center" src={logo} /></Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <ProgressBar variant="secondary" now={100} className="m-3"/>
              <Offcanvas.Body>
                <Nav className="side-text justify-content-center flex-grow-1 pe-3">
                  <Nav.Link href="/news"><BiIcons.BiNews />  소식</Nav.Link>
                  <Nav.Link href="/userrank"><RiIcons.RiArrowUpDownLine />  신하 순위</Nav.Link>
                  <Nav.Link href="/statistics"><GoIcons.GoGraph />  주제별 통계</Nav.Link>
                  <Nav.Link href="/gossip"><GoIcons.GoCommentDiscussion />  저잣거리</Nav.Link>
                  <Nav.Link href="/help"><IoIcons.IoMdHelpCircle />  도움말</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}


export default NavBar;