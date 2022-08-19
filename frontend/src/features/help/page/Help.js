import React, { useState, useRef, useEffect } from "react";
import { Button, Form, FormGroup, FormLabel, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";

//yu
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Slide from "./Slide";

import img0 from "../../../assets/images/001.png";
import img1 from "../../../assets/images/002.png";
import img2 from "../../../assets/images/003.png";
import img3 from "../../../assets/images/004.png";
import img4 from "../../../assets/images/005.png";
import img5 from "../../../assets/images/006.png";
import img6 from "../../../assets/images/007.png";
import img7 from "../../../assets/images/008.png";
import img8 from "../../../assets/images/009.png";
import img9 from "../../../assets/images/010.png";
import img10 from "../../../assets/images/011.png";
import img11 from "../../../assets/images/012.png";
import img12 from "../../../assets/images/013.png";
import img13 from "../../../assets/images/014.png";

//이미지 파일
import light_base from "../../../assets/images/light_base.png";
import help_form_img from "../../../assets/images/두루마기.png";
import login_img from "../../../assets/images/login_img.png";

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
  padding-top: 10%;
  padding-bottom: 10%;
`;

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
`;
//로고 이미지
const LoginLogo = styled.img`
  width: 100%;
  height: 100%;
  flex: 1;
  margin-bottom: 10px;
  margin-top: 3em;
  text-align: top;
`;

//링크
const StyledLink = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

//yu
const Container1 = styled.div`
  width: 55%;
  margin: 0px 22.3%;
  padding: 80px 0px;
  height: 100%;
  overflow: hidden; // 선을 넘어간 이미지들은 숨겨줍니다.
  font-family: JsaHON;
  display: block;
`;
const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-family: JsaHON;
  width: 30%;
  height: 4rem;
  padding: 1rem;
  justify-content: center;
`;

const Button1 = styled.div`
  all: unset;
  padding: 0.5em 1em;
  margin: 1em 1em;

  cursor: pointer;
  &:hover {
    background: linear-gradient(90deg, darkred 2%, rgb(0, 0, 0) 550%);
    color: white;
  }

  background: linear-gradient(90deg, rgb(255, 255, 255) 2%, rgb(0, 0, 0) 550%);
  border-radius: 500px;
  color: rgb(0, 0, 0);
  cursor: pointer;
  box-shadow: 12px 12px 24px rgb(175, 175, 235);
`;
const SliderContainer = styled.div`
  margin: 15px auto;
  
  margin-bottom: 2em;
  display: flex; // 이미지들을 가로로 나열합니다.
`;
const Text = styled.div`
  text-align: center;
  color: burlywood;
  p {
    color: #fff;
    font-size: 20px;
    background-color: burlywood;
    display: inline-block;
    border-radius: 50px;
    padding: 0.5em 1em;
  }
`;
const Center = styled.div`
  text-align: center;
`;

const HelproomBase = styled.div`
display: block;
  position: relative;
  height: 120%;
  background: center;
  background-repeat: no-repeat;
  background-image: url(${help_form_img});
  background-size: contain;

`;

const TOTAL_SLIDES = 13; // 전체 슬라이드 개수 (총3개. 배열로 계산)

export default function Help() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // Next 버튼 클릭 시
  const NextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면
      setCurrentSlide(0); // 1번째 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  // Prev 버튼 클릭 시
  const PrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES); // 마지막 사진으로 넘어갑니다.
      // return;  // 클릭이 작동하지 않습니다.
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);

  const showBtnSlide = (idx) => {
    setCurrentSlide(idx);
  };

  return (
    <Container>
      <NavBar />
      <HelproomBase>
      {/* <HeaderContainer>
        <h2>도움말</h2>
        </HeaderContainer> */}
        <Container1>
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "left",
              fontSize: "35px",
            }}
          >
       
            <div
              style={{
                color: currentSlide === 0 ? "white" : "white",
                fontWeight: currentSlide === 0 ? "" : "",
                textShadow:
                  currentSlide === 0
                    ? "-3px 0 black, 0 3px black, 3px 0 black, 0 3px black"
                    : "",
                // backgroundColor: currentSlide === 0 ? "black" : "white",
                cursor: "pointer",
              }}
              onClick={() => {
                showBtnSlide(0);
              }}
            >
             게임준비 &nbsp;
            </div>
            <div
              style={{
                color: currentSlide === 2 ? "white" : "white",
                fontWeight: currentSlide === 2 ? "" : "",
                textShadow:
                currentSlide === 2
                ? "-3px 0 black, 0 3px black, 3px 0 black, 0 3px black"
                  : "",
                //   backgroundColor: currentSlide === 1 ? "black" : "white",
                cursor: "pointer",
                
              }}
              onClick={() => {
                showBtnSlide(2);
              }}
            >
              게임시작 &nbsp;
            </div>
            <div
              style={{
                color: currentSlide === 5 ? "white" : "white",
                fontWeight: currentSlide === 5 ? "" : "",
                textShadow:
                currentSlide === 5
                ? "-3px 0 black, 0 3px black, 3px 0 black, 0 3px black"
                  : "",
                //   backgroundColor: currentSlide === 2 ? "black" : "white",
                cursor: "pointer",
              }}
              onClick={() => {
                showBtnSlide(5);
              }}
            >
              게임종류 &nbsp;
            </div>
          </div>

          <SliderContainer ref={slideRef}>
          <Slide img={img0} />
            <Slide img={img1} />
            <Slide img={img2} />
            <Slide img={img3} />
            <Slide img={img4} />
            <Slide img={img5} />
            <Slide img={img6} />
            <Slide img={img7} />
            <Slide img={img8} />
            <Slide img={img9} />
            <Slide img={img10} />
            <Slide img={img11} />
            <Slide img={img12} />
            <Slide img={img13} />


          </SliderContainer>
          <br/>
          <Center>
            <Button1 onClick={PrevSlide}>이전</Button1>
            <Button1 onClick={NextSlide}>다음</Button1>
          </Center>
        </Container1>
      </HelproomBase>
    </Container>
  );
}
