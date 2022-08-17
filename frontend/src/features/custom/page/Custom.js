import React, { useState, useEffect, useCallback } from "react";
import {Button, Form, FormGroup, InputGroup} from 'react-bootstrap';
import NavBar from "../../../common/navbar/NavBar";
import RankModal from "../custom_modal";
import '../custom_modal.css'
import CusPagination from "./cusPagination";
import { useDispatch } from 'react-redux';
import { useNavigate}from 'react-router-dom'
import { cus_roomcreate } from '../customSlice';
import CusRoomList from "./cusRoomList";
import './Custom.css';
import axios from "axios";


function Custom() {
	const isCustom = true;
	const dispatch = useDispatch();
    const history = useNavigate();


	// 페이지네이션
	const [limit, setLimit] = useState(4);
	const [page, setPage] = useState(1);
	const offset = (page - 1) * limit;
	const currentRooms = (rooms) => {
		let currentRooms = 0;
		currentRooms = rooms.slice(offset, offset+limit);
		return currentRooms;
	};

	// 배포서버
	const OPENVIDU_SERVER_URL = 'https://i7e103.p.ssafy.io:8082/';
	const OPENVIDU_SERVER_SECRET = 'SMND';

	// api(검색창)
	const [rooms, setRooms] = useState([]);
	const [userInput, setUserInput] = useState("");

	useEffect(() => {
	fetch('https://i7e103.p.ssafy.io/api/room/custom/list', {
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
		normal : "False",
		nickname : loginInfo.nickname,
		title : "",
		customPassword : "",
		gameCategoriesUid : "1",
    	gameCategoryTopicsUid : "22",
		})

	//방 제목
    const onChangeTitle = (e) => {
        const { name, value } = e.target;
        setRoom({
            ...room,
            [name]: value
        });
	}

    //방 비밀번호
    const onPasswordHandler = (e) => {
		const value = e.target.value
        setRoom({
            ...room,
            customPassword: value
        });
    }

    //방 생성 눌렀을 때 호출되는 함수
    const onSubmit = (event) => {

    //입력값 남겨두는 함수
    event.preventDefault()

    if(room.title === ''){
        alert('제목을 입력해주세요');
    } else {
        // userInfo(UserSlice에 있음) => room
		let conferenceRoomUrl = null
		let data = null
        dispatch(cus_roomcreate(room))
        .then((response) => {
			conferenceRoomUrl = response.payload.data.conferenceRoomUrl
            if(response.payload.status === 200){
                history("/custom", {replace: true})
				data = JSON.stringify({ customSessionId: conferenceRoomUrl});
				axios.post(OPENVIDU_SERVER_URL + 'openvidu/api/sessions', data, {headers: {Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET), 'Content-Type': 'application/json'}})
            }else{
                history("/custom", {replace:true})
            }
		}).then(() => {
			axios.post(OPENVIDU_SERVER_URL + 'openvidu/api/sessions/' + conferenceRoomUrl + '/connection', data, {headers: {Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET), 'Content-Type': 'application/json'}})
			history("/game/custom/" + conferenceRoomUrl)
		})
    }
  }

	//room 객체 바인딩
	const { title, customPassword } = room;


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


	// 체크박스 버튼
	const [checkedButtons, setCheckedButtons] = useState([]);
	
	const changeHandler = (checked, id) => {
		if (checked) {
		setCheckedButtons([...checkedButtons, id]);
		} else {
		setCheckedButtons(checkedButtons.filter(button => button !== id));
		}
	};


	const isAllChecked = checkedButtons.length === 1;
	const disabled = !isAllChecked;



	return (
		<div className="custom_base">
		<NavBar className="navbar" isCustom={isCustom}/>
			<div className="layout-container">
			{/* 게임방 목록 */}
			<main className="main">
				<CusRoomList key={rooms.uid} data={currentRooms(filterRoom)} />
			</main>
			{/* 하단 */}
			<footer>
				{/* 페이지네이션 */}
				<CusPagination 
					total={rooms.length}
					limit={limit}
					page={page}
					setPage={setPage}
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
								<FormGroup className='room_password mb-4' controlId='formBasicpassword'>
									<input type="checkbox" id="check" style={{zoom: "1.5", marginRight: "5%"}}
										onChange={e => {
											changeHandler(e.currentTarget.checked, 'check');
										}}
										checked={checkedButtons.includes('check') ? true : false}
										></input>
										<Form.Label style={{marginRight: "40%", fontSize: "1.5rem"}}>비밀번호</Form.Label>									
										<Form.Control disabled={disabled} 
										style={disabled 
										? {width: "80%", textalign:"left", marginLeft:"10%", backgroundColor: "silver", fontSize: "1.2rem"} 
										: {width: "80%", textalign:"left", marginLeft:"10%", backgroundColor: "white", fontSize: "1.2rem"}} 
										name='customPassword' type='password' placeholder='비밀호를 입력해주세요.' value={customPassword} onInput={onPasswordHandler}
										/>								
									</FormGroup>
								<FormGroup style={{width:"80%", display:"flex", margin:"0 auto"}} >
									<Button style={{marginBottom: "1em", width: "50%", backgroundColor:"#8C4D25", border:"0", fontSize: "1.3rem"}} type="submit" onClick={onSubmit} variant="primary">방 생성</Button>
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
export default Custom;