import React from "react";
import { Link } from "react-router-dom";

const NewRoom = () => {
    const handleNewRoom = (event) => {
        event.preventDefault();
        const name = event.target.roomname.value;
        event.target.roomname.value = "";
        if (name.length == 0) return;
        WebSocket.emit("room_new", name);
    };

    return (
        <div className="newroom">
            <form className="newroom_form" onSubmit={handleNewRoom}>
                <input
                    className="newroom__input"
                    type="text"
                    name="roomname"
                    placeholder="방 이름"
                ></input>
                <button className="newroom__submit">방 만들기</button>
            </form>
        </div>
    );
};

export default NewRoom;