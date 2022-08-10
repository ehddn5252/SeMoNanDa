import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../../../common/navbar/NavBar";
import './Rank.css';
import Pagination from "./Pagination";
import {Button, Form, FormGroup} from 'react-bootstrap';
import Modal from "../../../common/modal/Modal";
import '../../../common/modal/Modal.css'
import { useDispatch } from 'react-redux';
import { useNavigate}from 'react-router-dom'
import { roomcreate } from '../RankSlice';

import RoomList from "./RoomList";



function Rank() {

	const dispatch = useDispatch();
    const history = useNavigate();

	//오류메시지 상태저장
	// const [roomMessage, setRoomMessage] = useState('')


	// 유효성 검사 상태 저장
	// const [isRoom, setIsRoom] = useState(false)



	// 페이지네이션
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(2);

	const indexOfLast = currentPage * postsPerPage;
	const indexOfFirst = indexOfLast - postsPerPage;
	const currentPosts = (rooms) => {
		let currentPosts = 0;
		currentPosts = rooms.slice(indexOfFirst, indexOfLast);
		return currentPosts;
	};


	// api 주소
	// axios1.get('/room/normal/list')
	// fetch('http://localhost:8080/api/room/normal/list')


	// api(검색창)
	const [rooms, setRooms] = useState([]);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
	fetch('http://localhost:8080/api/room/normal/list', {
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
		console.log('전체 값', e.target)
		console.log('타이틀 값', e.target.value)
        setRoom({
            ...room,
            [name]: value
        });
	}

    //방 카테고리
    const onSelectGameCategoriesUid = (e) => {
		const value = e.target.value
		console.log('카테고리', value)
        setRoom({
            ...room,
            gameCategoriesUid: value
        });
    }

    //방 생성 눌렀을 때 호출되는 함수
    const onSubmit = (event) => {

    //입력값 남겨두는 함수
    event.preventDefault()

    if(room.title === ''){
        alert('제목을 입력해주세요');
    } else if(room.gameCategoriesUid === 11) {
		alert('카테고리를 다시 선택해주세요.')
	}
	else{
        // userInfo(UserSlice에 있음) => room
        dispatch(roomcreate(room))
        .then((response) => {
            console.log("create_response",response)
            if(response.payload.status === 200){
                history("/rank", {replace: true})
				console.log('된다', room);
            }else{
                history("/custom", {replace:true})
				console.log('안된다', room);
            }
		})
    }
  }

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
		<div className="rank-base">
		<NavBar />
			<div className="layout container">
			{/* 방 생성 화면(메인) */}
			<main>
				<RoomList key={rooms.uid} data={currentPosts(filterRoom)} />
			</main>
			{/* 하단 */}
			<footer>
				{/* 페이지네이션 */}
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={rooms.length}
					paginate={setCurrentPage}
				/>
				{/* 검색 및 방생성 */}
				<div className="bottom">
					{/* 검색 */}
					<div className="search">
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
					{/* 방생성 */}
					<Button className="create_room" onClick={onClickToggleModal}>방 생성</Button>
					{isOpenModal&& (
						<Modal onClickToggleModal={onClickToggleModal}>
							<FormGroup className='mb-3' controlId='formBasicTitle'>
								<Form.Label style={{marginLeft: "10%"}}>방 제목</Form.Label>
								<Form.Control style={{width: "60%", textalign:"left", marginLeft:"10%"}} name='title' type='text' placeholder='방 제목' value={title} onInput={onChangeTitle}/>
							</FormGroup>

							<FormGroup className='mb-3' controlId='formBasicCategory'>
								<Form.Label style={{marginLeft: "10%"}}>카테고리</Form.Label>

								{/* 드롭박스 */}
								<Form.Select aria-label="Default select example" onClick={onSelectGameCategoriesUid}>
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
								<Button style={{marginBottom: "1em", width: "50%", backgroundColor:"#8C4D25", border:"0"}} type="submit" onClick={onSubmit} variant="primary">방 만들기</Button>
								<Button style={{marginBottom: "1em", width: "50%", backgroundColor:"grey", marginLeft:"1em"}} variant="secondary" onClick={onCloseModal}>취소</Button>
							</FormGroup>
						</Modal>
					)}
				</div>
			</footer>
			</div>
		</div>
	);
}
export default Rank;