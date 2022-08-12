import React, { useState, useEffect } from "react";
import cusRoom from './cusRoom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './cusRoom.css'


// api를 가져와서 차례대로 보여줌
function cusRoomList({ data }) {
  return (
    <Row xs={1} md={2} className="customroom_base g-4">
            {data.map((room) => (
              <Col>
              <cusRoom key={room.uid} {...room} />
              </Col>
            ))}
    </Row>
    );
  }


export default cusRoomList;