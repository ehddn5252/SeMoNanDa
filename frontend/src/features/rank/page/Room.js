import React from "react";
import Card from 'react-bootstrap/Card';
import { useNavigate }from 'react-router-dom'
import './Room.css';
import daily_life from '../../../assets/images/food.png'
import food from '../../../assets/images/food.png'
import developer from '../../../assets/images/developer.png'
import mbti from '../../../assets/images/mbti.png'
import love from '../../../assets/images/love.png'
import opposite from '../../../assets/images/opposite.png'
import education from '../../../assets/images/education.png'

 
const Logo = [
    "더미",
    "더미데이터",
    daily_life,
    food,
    developer,
    mbti,
    love,
    opposite,
    education,
];


function Room(props) {
    const { title, gameCategoriesUid, adminNickname } = props;

    // 방입장
    const history = useNavigate();
    const enterRoom = () => {
        history('/game/normal/' + props.conferenceRoomUrl)
    }

    return (
        <div className="gameroom">
            <div className="image">
                <Card.Img style={{ width: '7rem' }} src={`${Logo[gameCategoriesUid]}`} />
            </div>
            <div className="body">
                <Card.Body>
                    <Card.Title>
                        <h4>{title}</h4>
                    </Card.Title>
                    <Card.Title>
                        <span>주최자 : {adminNickname}</span>
                    </Card.Title>
                    <button className="enter" onClick={enterRoom}>입장하기</button>
                </Card.Body>
            </div>
        </div>
    );
}

export default Room;