import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserPagination from "./UserPagination";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

function Collapse() {
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

  return (
    <Accordion>
      {topics
        .slice(offset, offset + limit)
        .map(
          ({ topic, answerA, answerB, teamAWinCount, teamBWinCount }, idx) => (
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton>{answerA}</AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>{answerB}</AccordionItemPanel>
            </AccordionItem>
          )
        )}
      <div>
        <UserPagination
          total={topics.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </Accordion>
  );
}
export default Collapse;
