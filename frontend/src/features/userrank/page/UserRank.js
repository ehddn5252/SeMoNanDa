import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../../common/navbar/NavBar";
import Table from 'react-bootstrap/Table';
import UserPagination from "./UserPagination";

//이미지 파일
import light_base from "../../../assets/images/light_base.png";
import Statistics_form_img from "../../../assets/images/Statistics_form_img.png";
import scroll_blue from "../../../assets/images/scroll_blue.png";
import scroll_basic from "../../../assets/images/scroll_basic.png";

//메인페이지 배경화면 Container
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: center;
  background-color: black;
  background-repeat: no-repeat;
  background-image: url(${light_base});
  background-size: cover;
  padding-top: 10%;
  padding-bottom: 10%;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

//header
const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  font-family: JsaHON;
  width: 30%;
  height: 4rem;
  padding: 2rem;
  justify-content: center;
`;


//yu
const Base = styled.div`
  display: block;
  position: relative;
  height: 120%;
  background: center;
  background-repeat: no-repeat;
  background-image: url(${scroll_blue});
  background-size: contain;
  z-index : 0;
  
`;
const UserRank = () => {
  const [users, setUsers] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  useEffect(() => {
    fetch('https://i7e103.p.ssafy.io/api/rank/total', {
      method: "GET",
    })
    .then((res) => res.json())
    .then((res) => {
      setUsers(res);
    });
    }, []);

  /**Form img사이즈 수정해야함 */
  return (
    <Container id="Container">
      <NavBar />
      <Base>
      <div style={{ fontFamily: "JsaHON",borderStyle: "none", width: "80%", margin : "0px 10%", padding : "50px 0px"}}>
        <HeaderContainer style={{color : "lightgray"}}>
          <h1>신하 순위</h1>
        </HeaderContainer>
        <br/>
        <Table striped  style={{ width: '70%', backgroundImage: `url(${Statistics_form_img})`, margin: "0 auto" ,fontSize:"1.1rem"}}>
        <thead style={{fontSize : "1rem"}}>
          <tr>
            <th>순위</th>
            <th>닉네임</th>
            <th>랭크 포인트</th>
            <th>승</th>
            <th>패</th>
            <th>승률</th>
          </tr>
        </thead>
        
        {users.slice(offset, offset+limit).map(({ nickname, rankpoint, numberOfWins, numberOfLoses}, idx ) => (
        <tbody>
          <tr>
            <td>{(page - 1) * 10 + idx + 1}</td>
            <td>{nickname}</td>
            <td>{rankpoint}</td>
            <td>{numberOfWins}</td>
            <td>{numberOfLoses}</td>
            <td>
              {
                numberOfWins === 0
                ? 0 + '%'
                : ( numberOfLoses === 0
                    ? 100 + '%'
                    : numberOfWins / (numberOfWins + numberOfLoses) * 100 + '%'
                )
              }
            </td>
          </tr>
        </tbody>
        ))}
      </Table>
      </div>

      </Base>
      <div>
      <UserPagination 
            total={users.length}
            limit={limit}
            page={page}
            setPage={setPage}
            />
      </div>
      
    </Container>
  );
};

export default UserRank;
