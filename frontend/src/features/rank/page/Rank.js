import React, { useState, useEffect, useCallback } from "react";
import {Button, Form, FormGroup} from 'react-bootstrap';
import NavBar from "../../../common/navbar/NavBar";
import RankModal from "../rank_modal";
import '../rank_modal.css'
import Pagination from "./Pagination";
import { useDispatch } from 'react-redux';
import { useNavigate}from 'react-router-dom'
// import { roomcreate } from '../rankSlice';
import RoomList from "./RoomList";
import './Rank.css';


function Rank() {
	const isRank = true;
	const dispatch = useDispatch();
    const history = useNavigate();


	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const [roomsPerPage, setRoomsPerPage] = useState(4);

	const indexOfLast = currentPage * roomsPerPage;
	const indexOfFirst = indexOfLast - roomsPerPage;
	const currentRooms = (rooms) => {
		let currentRooms = 0;
		currentRooms = rooms.slice(indexOfFirst, indexOfLast);
		return currentRooms;
	};


	// api 주소
	// axios1.get('/room/normal/list')
	// fetch('http://localhost:8080/api/room/normal/list')


	// api(검색창)
	const [rooms, setRooms] = useState([]);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
	fetch('https://i7e103.p.ssafy.io/api/room/normal/list', {
		method: "GET",
	})
	.then((res) => res.json())
	.then((res) => {
		setRooms(res);
	});
	}, []);


	// 검색 창
	// 엔터를 입력하였을 때 조건에 맞는 방을 보여줌
	const handleKeyPress = (e) => {
		if(e.key === 'Enter') {
			setUserInput(e.target.value);
		}
	  }

	// 검색 버튼을 눌렀을 때 조건에 맞는 방을 보여줌
	const [message, setMessage] = useState('');

	const handleChange = event => {
	setMessage(event.target.value);
	};

	const handleClick = event => {
	event.preventDefault();
	setUserInput(message);
	};

	// 전달된 메시지를 필터링하여 방 목록을 보여줌
	const filterRoom = rooms.filter((room) => {
	return room.title.toLowerCase().includes(userInput.toLowerCase());
	});



	
	// 방 생성
	// 로컬 저장
	let loginInfoString = window.localStorage.getItem("login_user");
	let loginInfo = JSON.parse(loginInfoString);

	//서버로 전달할 room객체
	const [room, setRoom] = useState({
		normal : "True",
		nickname : loginInfo.nickname, // (roomAdminUserUid가 변경 되면 => oginInfo.id)
		title : "",
		gameCategoriesUid: "",
		gameCategoryTopicsUid : "35",
		})

	//방 제목
    const onChangeTitle = (e) => {
        const { name, value } = e.target;
        setRoom({
            ...room,
            [name]: value
        });
	}

    //방 카테고리
    const onSelectGameCategoriesUid = (e) => {
		const value = e.target.value
        setRoom({
            ...room,
            gameCategoriesUid: value
        });
    }

//     //방 생성 눌렀을 때 호출되는 함수
//     const onSubmit = (event) => {

//     //입력값 남겨두는 함수
//     event.preventDefault()

//     if(room.title === ''){
//         alert('제목을 입력해주세요');
//     } else if(room.gameCategoriesUid === 11) {
// 		alert('카테고리를 다시 선택해주세요.')
// 	}
// 	else{
//         // userInfo(UserSlice에 있음) => room
//         dispatch(roomcreate(room))
//         .then((response) => {
//             console.log("create_response",response)
//             if(response.payload.status === 200){
//                 history("/rank", {replace: true})
// 				console.log('된다', room);
//             }else{
//                 history("/rank", {replace:true})
// 				console.log('안된다', room);
//             }
// 		})
//     }
//   }

	//room 객체 바인딩
	const { title } = room;


	// 모달 관련
	const [isOpenModal, setOpenModal] = useState(false);


	//모달)open 동작
	const onClickToggleModal = useCallback(() => {
	setOpenModal(!isOpenModal);
	},[isOpenModal]);

	//모달) 닫기 버튼 누르면 실행하는 동작
	const onCloseModal = (e) => {
		e.preventDefault();
		setOpenModal(false);
	}


	return (
		<div className="rank_base">
		<NavBar className="navbar" isRank={isRank}/>
			<div className="layout_container">
			{/* 게임방 목록 */}
			<main className="main">
				<RoomList key={rooms.uid} data={currentRooms(filterRoom)} />
			</main>
			{/* 하단 */}
			<footer>
				{/* 페이지네이션 */}
				<Pagination 
					roomsPerPage={roomsPerPage}
					totalRooms={rooms.length}
					paginate={setCurrentPage}
				/>
				{/* 검색 및 방생성 */}
				<div className="bottom">
					{/* 방생성 */}
					<button className="create_room" onClick={onClickToggleModal}>방 생성</button>
						{isOpenModal&& (
							<RankModal style={{marginLeft: "20%"}} onClickToggleModal={onClickToggleModal}>
								<FormGroup className='room_title mb-4' controlId='formBasicTitle'>
									<Form.Label style={{marginLeft: "10%"}}>방 제목</Form.Label>
									<Form.Control style={{width: "80%", textalign:"left", marginLeft:"10%", backgroundColor: "dcdcdc", fontSize: "1.2rem"}} name='title' type='text' placeholder='방 제목을 입력해주세요.' value={title} onInput={onChangeTitle}/>
								</FormGroup>
	
								<FormGroup className='room_category mb-5' controlId='formBasicCategory'>
									<Form.Label style={{marginLeft: "10%"}}>카테고리</Form.Label>
	
									{/* 드롭박스 */}
									<Form.Select style={{width: "80%", marginLeft: "10%", backgroundColor: "dcdcdc", fontSize: "1.2rem", color: "gray"}} aria-label="Default select example" onClick={onSelectGameCategoriesUid}>
										<option value="11">카테고리를 선택해주세요.</option>
										<option value="2">일상생활</option>
										<option value="3">음식</option>
										<option value="4">개발자</option>
										<option value="5">MBTI</option>
										<option value="6">연애</option>
										<option value="7">극과극</option>
										<option value="8">교육</option>
									</Form.Select>
								</FormGroup>
								<FormGroup style={{width:"80%", display:"flex", margin:"0 auto"}} >
									{/* <Button style={{marginBottom: "1em", width: "50%", backgroundColor:"#8C4D25", border:"0", fontSize: "1.3rem"}} type="submit" onClick={onSubmit} variant="primary">방 생성</Button> */}
									<Button style={{marginBottom: "1em", width: "50%", backgroundColor:"grey", marginLeft:"1em", fontSize: "1.3rem"}} variant="secondary" onClick={onCloseModal}>취소</Button>
								</FormGroup>
							</RankModal>
						)}
					{/* 검색 */}
					<div className="search_base">
						<input
							type="search"
							className="search"
							onKeyUp={handleKeyPress}
							onChange={handleChange}
							value={message}
							autoComplete="off"
							placeholder="방 제목을 입력해 주세요."
						/>
						<button onClick={handleClick}>검색</button>
					</div>
				</div>
			</footer>
			</div>
		</div>
	);
}
export default Rank;