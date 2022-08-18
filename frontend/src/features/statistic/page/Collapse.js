import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import UserPagination from "./UserPagination";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import axios1 from "../../../common/api/http-common";
import { category, categoryAll } from "./SSlice";
import { useDispatch } from "react-redux";

import styled from "styled-components";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";
import Statistics_form_img from "../../../assets/images/Statistics_form_img.png";
import scroll_basic from "../../../assets/images/scroll_basic.png";
import scroll_basic2 from "../../../assets/images/그림1.png";

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
  font-family: JsaHON;
  width: 40%;
  height: 4rem;
  padding: 2rem;
  justify-content: center;
  margin-left: 35%;
  margin-top : 25px;
  align-items: center;
  margin-bottom: -28px;
`;

function Collapse() {
  let [topics, setTopic] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const dispatch = useDispatch();

  //서버로 전달할 categoryUid 객체
  const [uid, setUid] = useState({
    categoryUid: "11",
  });

  //onSelectUid 함수
  const onSelectUid = (e) => {
    const value = e.target.value;
    setUid({
      ...uid,
      categoryUid: value,
    });

    console.log(uid);
  };
  //onSelectUid 함수 끝

  //11로 하면 여기서
  // useEffect(() => {
  //   const data = { categoryUid: 11 };
  //   dispatch(categoryAll(data)).then((response) => {
  //     //   console.log("category_response",response)
  //     if (response.payload.status === 200) {
  //       setTopic(response.payload.data);
  //     } else {
  //     }
  //   });
  // }, []);
  //여기까지 지워도 됨

  useEffect(() => {
    console.log("topics useEffect 실행");
    setPage(1);

    if (uid.categoryUid == "11") {
      dispatch(categoryAll()).then((response) => {
        if (response.payload.status === 200) {
          setTopic(response.payload.data);
        } else {
        }
      });
    } else {
      dispatch(category(uid)).then((response) => {
        if (response.payload.status === 200) {
          setTopic(response.payload.data);
        } else {
          console.log("안됩니다");
        }
      });
    }
  }, [uid]);

  return (
    <div>
      <Accordion
        allowZeroExpanded
        style={{
          fontFamily: "JsaHON",
          borderStyle: "none",
          width: "90%",
          margin: "0px 5%",
          padding: "50px 0px",

        }}
      >
        <HeaderContainer style={{color : "lightgray"}}>
          <div>
            <h1>종합 순위</h1>
          </div>
          <div>
            {/* 드롭박스 */}
            <Form.Select
              style={{
                width: "100%",
                marginLeft: "10%",

                backgroundColor: "dcdcdc",
                fontSize: "1rem",
              }}
              aria-label="Default select example"
              onChange={onSelectUid}
            >
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
        </HeaderContainer>
        <br />
        <br />
        {topics
          .slice(offset, offset + limit)
          .map(
            (
              {
                uid,
                categoryUid,
                topic,
                answerA,
                answerB,
                teamAWinCount,
                teamBWinCount,
              },
              idx
            ) => (
              // backgroundImage: `url(${Statistics_form_img})`,
              <div key={uid}>
                {1 === 1 ? (
                  <AccordionItem
                    style={{
                      backgroundImage: `url(${scroll_basic2})`,
                      width: "60%",
                      margin: "0px 20%",
                      fontSize: "1.2rem",
                    }}
                  >
                    <AccordionItemHeading>
                      <AccordionItemButton
                        style={{
                          backgroundImage: `url(${scroll_basic2})`,
                          borderBottom: "5px",
                        }}
                      >
                        {topic} {answerA} vs {answerB}
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <h3> {answerA} </h3>승리 횟수 :{teamAWinCount}
                        {/* {teamAWinCount === 0
                      ? 0 + "%"
                      : (
                          teamAWinCount /
                          (teamAWinCount + teamBWinCount)
                        ).toFixed(3) *
                          100 +
                        "%"} */}
                      </div>
                      <div>
                        <h3> {answerB} </h3>승리 횟수 :{teamBWinCount}
                        {/* {answerB} : {teamBWinCount}, 확률 :
                    {teamBWinCount === 0
                      ? 0 + "%"
                      : (
                          teamBWinCount /
                          (teamAWinCount + teamBWinCount)
                        ).toFixed(3) *
                          100 +
                        "%"}</div> */}
                      </div>
                    </AccordionItemPanel>
                  </AccordionItem>
                ) : teamAWinCount === 0 ? (
                  100 + "%"
                ) : (
                  (teamAWinCount / (teamAWinCount + teamAWinCount)) * 100 + "%"
                )}
              </div>
            )
          )}
        <br />
        <br />
      </Accordion>
      <div>
        <UserPagination
          total={topics.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
export default Collapse;
