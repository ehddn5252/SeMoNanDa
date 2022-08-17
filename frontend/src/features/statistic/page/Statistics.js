import React, { useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";

//이미지 파일
import light_base from "../../../assets/images/light_base.png";
import Statistics_form_img from "../../../assets/images/Statistics_form_img.png";
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
const StatisticsRoomBase = styled.div`
  display: block;
  position: relative;
  height: 120%;
  width: 65%;
  margin: 0px 17.5%;
  padding: 100px 100px;

  background-image: url(${Statistics_form_img});
  background-size: contain;
`;

function Statistics (){
  //서버로 전달할 categoryUid 객체
	const [uid, setUid] = useState({
		categoryUid: "",
		})
    
      //categoryUid 
      const onSelectUid = (e) => {
        const value = e.target.value
        setUid({
                ...uid,
                categoryUid: value
            });
            console.log(value);
        }

  return (
    <Container>
      <NavBar />
      <StatisticsRoomBase>
        <div style={{ backgroundColor: "violet" }}>
          <h1>주제별 통계</h1>
          {/* 드롭박스 */}
									<Form.Select style={{width: "80%", marginLeft: "10%", backgroundColor: "dcdcdc", fontSize: "1.2rem"}} aria-label="Default select example" onClick={onSelectUid}>
										<option value="11">카테고리를 선택해주세요.</option>
										<option value="2">일상생활</option>
										<option value="3">음식</option>
										<option value="4">개발자</option>
										<option value="5">MBTI</option>
										<option value="6">연애</option>
										<option value="7">극과극</option>
										<option value="8">교육</option>
									</Form.Select>
        </div>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
        <h1>주제별 통계</h1>
      </StatisticsRoomBase>
    </Container>
  );
};

export default Statistics;
