import React from "react";
import styled from "styled-components";
// import daily_life from "../../../assets/images/daily_life.png"
// import food from "../../../assets/images/food.png"
// import computer from "../../../assets/images/computer.png"
// import mbti from "../../../assets/images/mbti.png"
// import love from "../../../assets/images/love.png"
// import opposite from "../../../assets/images/opposite.png"
// import education from "../../../assets/images/education.png"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



// const Card = styled.div`
//     display: block;
//     width: 100%;
//     height: 100vh;
//     max-width: 100%;
//     max-height: 100vh;
//     position: relative;
//     background: center;
//     background-repeat: no-repeat;
//     background-size: cover;
//     justify-content: center;
//     align-items: center;
// `

const Catgory = [
    "더미",
    "더미데이터",
    "일상생활",
    "음식",
    "개발자",
    "MBTI",
    "연애",
    "극과 극",
    "교육",
];


const Logo = [
    "더미",
    "더미데이터",
    "daily_life",
    "food",
    "computer",
    "mbti",
    "love",
   "opposite",
    "education",
];


function Room(props) {
    const { title, gameCategoriesUid, adminNickname} = props;

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`${Logo[gameCategoriesUid]}.png`} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    방 카테고리 : {Catgory[gameCategoriesUid]}
                </Card.Text>
                <Card.Text>
                    주최자 : {adminNickname}
                </Card.Text>
                <Button variant="primary">입장하기</Button>
            </Card.Body>
        </Card>



        // <Card>
        //     <div className="room_item container">
        //         <div>
        //             <img src= {`${Logo[gameCategoriesUid]}.png`} alt='왜 안돼'/>
        //         </div>
        //         <div className="room_info">
        //             <h1>{title}</h1>
        //             <br />
        //             <h2>방 카테고리 : {Catgory[gameCategoriesUid]}</h2>
        //             <br />
        //             <br />
        //             <h3>주최자 : {adminNickname}</h3>
        //             <br />
        //             <br />
        //             <button>입장하기</button>
        //         </div>
        //     </div>
        // </Card>
    );
}

export default Room;