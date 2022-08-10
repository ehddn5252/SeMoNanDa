import React, { useState, useEffect } from "react";
import Room from './Room'


// api를 가져와서 차례대로 보여줌
function RoomList({ data }) {
  return (
      <div className="roomList">
        {data.map((room) => (
          <Room key={room.uid} {...room} />
        ))}
      </div>
    );
  }


export default RoomList;