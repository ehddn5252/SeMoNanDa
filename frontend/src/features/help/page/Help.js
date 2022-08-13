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

import img1 from "../../../assets/images/light_base.png";
import img2 from "../../../assets/images/light_base.png";
import img3 from "../../../assets/images/light_base.png";

//이미지 파일
import light_base from "../../../assets/images/light_base.png";
import help_form_img from "../../../assets/images/help_form_img.png";
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
const yu = {
  display: "flex",
  backgroundColor: "gray",
  border: "1px solid black",
  width: "80%",
  height: "40%",
  margin: "0 auto",
};

const Container1 = styled.div`
  width: 50%;
  margin: auto;
  height: 1000px;
  overflow: hidden; // 선을 넘어간 이미지들은 숨겨줍니다.
`;
const Button1 = styled.div`
  all: unset;
  padding: 1em 2em;
  margin: 2em 2em;
  color: black;
  border-radius: 10px;
  border: 1px solid black;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const SliderContainer = styled.div`
  margin: 0 auto;
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

const TOTAL_SLIDES = 2; // 전체 슬라이드 개수 (총3개. 배열로 계산)

/////////////////////여기서
const buttonOnclickStyle = `
      width: 17%;
      height: 50px;
      border: 1.5px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight : bold;
      cursor: pointer;
      
      background-color: #E5C17B;
    `;

const buttonStyle = `
    width: 17%;
    height: 50px;
    border: 1.5px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  
    cursor: pointer;
`;

////////////////////////여기까지

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

  ////////////////
  const showBtnSlide = (idx) => {
    setCurrentSlide(idx);
  };
  /////////////////////////
  return (
    <Container>
      <NavBar />
      <Container1>
        <div>
          <div 
            style={{color : currentSlide === 0 ? 'white' : 'black'}}
            onClick={() => {
              showBtnSlide(0);
            }}
          >
            1번
          </div>
          <div
             style={{color : currentSlide === 1 ? 'white' : 'black'}}
            onClick={() => {
              showBtnSlide(1);
            }}
          >
            2번
          </div>
          <div
            style={{color : currentSlide === 2 ? 'white' : 'black'}}
            onClick={() => {
              showBtnSlide(2);
            }}
          >
            3번
          </div>
        </div>
        {/* <Text>
          <p>{currentSlide + 1}번 째 사진</p>
        </Text> */}
        <SliderContainer ref={slideRef}>
          <Slide img={img1} />
          <Slide img={img2} />
          <Slide img={img3} />
        </SliderContainer>
        <Center>
          <Button1 onClick={PrevSlide}>이전</Button1>
          <Button1 onClick={NextSlide}>다음</Button1>
        </Center>
      </Container1>
    </Container>
  );
}