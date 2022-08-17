import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import Table from "react-bootstrap/Table";
import UserPagination from "./UserPagination";

//이미지 파일
import light_base from "../../../assets/images/light_base.png";
import Statistics_form_img from "../../../assets/images/Statistics_form_img.png";
import login_img from "../../../assets/images/login_img.png";

//yu
import "@grapecity/wijmo.styles/wijmo.css";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjChartAnimate from "@grapecity/wijmo.react.chart.animation";
import Collapse from "./Collapse";

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

//header
const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 1rem;
  font-family: JsaHON;
  background-color: lightgray;
  width: 30%;
  height: 4rem;
  padding: 1rem;
  justify-content: center;
`;

function Statistics() {
  const [topics, setTopic] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    fetch("https://i7e103.p.ssafy.io/api/statis/subject", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setTopic(res);
      });
  }, []);

  // for (let index = 0; index < topics.length; index++) {
  //   console.log(topics[index]);
  // }

  //서버로 전달할 categoryUid 객체
  const [uid, setUid] = useState({
    categoryUid: "",
  });

  //categoryUid
  const onSelectUid = (e) => {
    const value = e.target.value;
    setUid({
      ...uid,
      categoryUid: value,
    });
    console.log(value);
  };

  return (
    <Container>
      <NavBar />
        <div>
          <Collapse />
        </div>
   
    </Container>
  );
}

export default Statistics;
