import React from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate }from 'react-router-dom'
import './cusRoom.css';


function CusRoom(props) {
    const { title, customPassword, adminNickname} = props;

    // 방입장
    const history = useNavigate();
    const enterRoom = () => {
        history('/game/custom/' + props.conferenceRoomUrl)
    }

    return (
        <div className="cus_gameroom">
            <div className="body">
                <Card.Body>
                    <Card.Title>
                        <h1>{title}</h1>
                    </Card.Title>
                    <Card.Title>
                        {/* <p>비밀번호 : {customPassword}</p> */}
                    </Card.Title>
                    <Card.Title>
                        <span>주최자 : {adminNickname}</span>
                    </Card.Title>
                    <button className="cus_enter" onClick={enterRoom}>입장하기</button>
                </Card.Body>
            </div>
        </div>
    );
}

export default CusRoom;