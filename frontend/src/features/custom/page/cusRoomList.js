import React, { useState, useEffect } from "react";
import CusRoom from './CusRoom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './CusRoom.css';


// api를 가져와서 차례대로 보여줌
function CusRoomList({ data }) {
  return (
    <Row xs={1} md={2} className="customroom_base g-4">
            {data.map((room) => (
              <Col>
              <CusRoom key={room.uid} {...room} />
              </Col>
            ))}
    </Row>
    );
  }


export default CusRoomList;