// css
import './Game.css';

// img파일
import exit from '../../assets/images/exit.png'
import ready from '../../assets/images/ready.png'
import ready_ok from '../../assets/images/ready_ok.png'
import start from '../../assets/images/start.png'
import red from '../../assets/images/red_subject.png';
import blue from '../../assets/images/blue_subject.png';
import ing from '../../assets/images/game_ing.png'


// 컴포넌트
import UserVideoComponent from './UserVideoComponent'
import Messages from './Messages'

import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, createRef } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux'
import Swal from 'sweetalert2';

const OPENVIDU_SERVER_URL = 'https://i7e103.p.ssafy.io:8082';
const OPENVIDU_SERVER_SECRET = 'SMND';

// url parameter 사용을 위한 HOC
function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
        mySessionId: 'custom' + this.props.params.id,
        myUserName: undefined,
        myUserId: undefined,
        session: undefined,
        mainStreamManager: undefined,
        publisher: undefined,
        subscribers: [],
        messages: [],
        isReady: false,
        isHost: false,
        isKing: false,
        servant: undefined,
        isLeaved: false,
        readyPlayer: 1,
        readyState : 'ready',
        token: undefined,
        topic: '',
        teamA: '',
        teamB: '',
        topicModalState:false,
        teamModalState:false,
        king:undefined,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.messageContainer = createRef(null);
    this.sendmessageByClick = this.sendmessageByClick.bind(this);
    this.sendmessageByEnter = this.sendmessageByEnter.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.readyClick = this.readyClick.bind(this);
    this.onSubAHandler = this.onSubAHandler.bind(this);
    this.onSubBHandler = this.onSubBHandler.bind(this);
    this.onTopicHandler = this.onTopicHandler.bind(this);
    this.topicSet = this.topicSet.bind(this);
    this.choiceA = this.choiceA.bind(this);
    this.choiceB = this.choiceB.bind(this);
  }

  // 처음 방을 들어갔을 때 실행
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    setTimeout(()=> {
      // storage에서 login한 user 정보 가져오기
      let loginInfoString = window.localStorage.getItem("login_user");
      let loginInfo = JSON.parse(loginInfoString)
      let token = window.localStorage.getItem('token')
      this.setState({
        token,
        myUserName : loginInfo.name,
        myUserId : loginInfo.id,
      })

      // 플레이어 세션 입장
      this.joinSession();
    }, 500);
  }

  // 방을 떠날 때 실행
  componentWillUnmount() {
    if (!this.state.isLeaved) {
      this.leaveSession();
    }
    window.location.reload();
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
  }

  onbeforeunload(event) {
      this.leaveSession();
  }

  handleChangeSessionId(e) {
      this.setState({
          mySessionId: e.target.value,
      });
  }

  handleChangeUserName(e) {
      this.setState({
          myUserName: e.target.value,
      });
  }

  handleMainVideoStream(stream) {
      if (this.state.mainStreamManager !== stream) {
          this.setState({
              mainStreamManager: stream
          });
      }
  }

  deleteSubscriber(streamManager) {
      let subscribers = this.state.subscribers;
      let index = subscribers.indexOf(streamManager, 0);
      if (index > -1) {
          subscribers.splice(index, 1);
          this.setState({
              subscribers: subscribers,
          });
      }
  }

  joinSession() {
      // --- 1) Get an OpenVidu object ---
  
      this.OV = new OpenVidu();
  
      // --- 2) Init a session ---
  
      this.setState(
          {
              session: this.OV.initSession(),
        },
        () => {
              var mySession = this.state.session;

              // --- 3) Specify the actions when events take place in the session ---

              // On every new Stream received...
              mySession.on('streamCreated', (event) => {
                  // Subscribe to the Stream to receive it. Second parameter is undefined
                  // so OpenVidu doesn't create an HTML video by its own
                  var subscriber = mySession.subscribe(event.stream, undefined);
                  var subscribers = this.state.subscribers;
                  subscribers.push(subscriber);

                  // Update the state with the new subscribers
                  this.setState({
                      subscribers: subscribers,
                  });
              });

              mySession.on('signal:chat', (event) => {
                let chatdata = event.data.split(',');
                if (chatdata[0] !== this.state.myUserName) {
                  this.setState({
                    messages: [
                      ...this.state.messages,
                      {
                        userName: chatdata[0],
                        text: chatdata[1],
                        chatClass: 'messages__item--visitor',
                      },
                    ],
                  });
                }
              });

              // On every Stream destroyed...
              mySession.on('streamDestroyed', (event) => {
                this.updateHost().then((clientData) => {
                  const host = JSON.parse(clientData).clientData;

                  mySession.signal({
                    data: host,
                    to: [],
                    type: 'update-host',
                  })
                  .then(() => {})
                  .cat((error) => {});
                });
                // Remove the stream from 'subscribers' array
                this.deleteSubscriber(event.stream.streamManager);
              });

              mySession.on('signal:update-host',(event) => {
                if(this.state.myUserName === event.data) {
                  this.setState({
                  isHost:true,
                  isReady:true,
                  })
                }
              });

              // On every asynchronous exception...
              mySession.on('exception', (exception) => {
                  console.warn(exception);
              });

              mySession.on('signal:ready-ok', (event) =>{
                this.setState({
                  readyPlayer: this.state.readyPlayer + 1
                })
              })
              
              mySession.on('signal:ready-cancel', (event) => {
                this.setState({
                  readyPlayer: this.state.readyPlayer - 1
                })
              })

              mySession.on('signal:game-start', ()=>{
                if (this.state.isHost) {
                  this.setState({
                    readyState : 'start',
                    topicModalState : true,
                    king: this.state.myUserId,
                  },() => {mySession.signal({
                    data: this.state.myUserId,
                    to:[],
                    type:'host-king'
                  })})
                } else {
                  Swal.fire({
                    title:'게임이 시작되었습니다. 왕이 주제를 정할때 까지 기다려주세요.',
                    confirmButtonText:'확인',
                  })
                  this.setState({readyState: 'start',});
                }
              })

              mySession.on('signal:host-king', (event) => {
                if ( this.state.isHost === false) {
                  this.setState({
                  king: event.data,
                  })
                }
              })

              mySession.on('signal:topic-choice', (event) =>{
                const topics = event.data.split('***')
                Swal.fire({
                  title:'주제가 공개되었습니다',
                  confirmButtonText:'확인'
                })
                if (this.state.isHost === false) {
                  this.setState({
                    topic: topics[0],
                    teamA: topics[1],
                    teamB: topics[2],
                    teamModalState:true,
                  })
                }
              })

              mySession.on('signal:choice-a', ()=> {
                Swal.fire({
                  title:'왕이 가. 를 선택하였습니다.',
                  confirmButtonText:'확인'
                })
                this.setState({
                  isKing: false,
                  servant: undefined,
                })
              })

              mySession.on('signal:choice-b', ()=> {
                Swal.fire({
                  title:'왕이 나. 를 선택하였습니다.',
                  confirmButtonText:'확인'
                })
                this.setState({
                  isKing:false,
                  servant: undefined,
                })
              })

              mySession.on('signal:winner', (event)=> {
                Swal.fire({
                  title:`승자는 ${event.data}님 입니다.`,
                  confirmButtonText:'확인'
                })
                window.location.href = 'http://localhost:3000'
              })

              // --- 4) Connect to the session with a valid user token ---
            
              // 'getToken' method is simulating what your server-side should do.
              // 'token' parameter should be retrieved and returned by your own backend
              this.getToken().then((token) => {
                  // First param is the token got from OpenVidu Server. Second param can be retrieved by every user on event
                  // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
                  mySession
                      .connect(
                          token,
                          { clientData: this.state.myUserName },
                      )
                      .then(async () => {
                          var devices = await this.OV.getDevices();
                          var videoDevices = devices.filter(device => device.kind === 'videoinput');
                          this.updateHost().then((firstUser) => {
                            const host = JSON.parse(firstUser).clientData;
            
                            if (this.state.myUserName === host)
                              this.setState({ 
                              isHost: true,
                              isReady: true});
                          });
                          // --- 5) Get your own camera stream ---
                      
                          // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
                          // element: we will manage it on our own) and with the desired properties
                          let publisher = this.OV.initPublisher(undefined, {
                              audioSource: undefined, // The source of audio. If undefined default microphone
                              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
                              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                              publishVideo: true, // Whether you want to start publishing with your video enabled or not
                              resolution: '640x480', // The resolution of your video
                              frameRate: 30, // The frame rate of your video
                              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                              mirror: true, // Whether to mirror your local video or not
                          });
                        
                          // --- 6) Publish your stream ---
                        
                          mySession.publish(publisher);
                        
                          // Set the main video in the page to display our webcam and store our Publisher
                          this.setState({
                              currentVideoDevice: videoDevices[0],
                              mainStreamManager: publisher,
                              publisher: publisher,
                          });
                      })
                      .catch((error) => {
                          console.log('There was an error connecting to the session:', error.code, error.message);
                      });
              });
          },
      );
  }

  leaveSession() {

      // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

      const mySession = this.state.session;
      
      if (mySession) {
          mySession.disconnect();
      }

      // Empty all properties...
      this.OV = null;
      this.setState({
          session: undefined,
          subscribers: [],
          mySessionId: this.props.params.id,
          myUserName: 'Participant' + Math.floor(Math.random() * 100),
          mainStreamManager: undefined,
          publisher: undefined
      });
  }

  async switchCamera() {
      try{
          const devices = await this.OV.getDevices()
          var videoDevices = devices.filter(device => device.kind === 'videoinput');

          if(videoDevices && videoDevices.length > 1) {

              var newVideoDevice = videoDevices.filter(device => device.deviceId !== this.state.currentVideoDevice.deviceId)

              if (newVideoDevice.length > 0){
                  // Creating a new publisher with specific videoSource
                  // In mobile devices the default and first camera is the front one
                  var newPublisher = this.OV.initPublisher(undefined, {
                      videoSource: newVideoDevice[0].deviceId,
                      publishAudio: true,
                      publishVideo: true,
                      mirror: true
                  });

                  //newPublisher.once("accessAllowed", () => {
                  await this.state.session.unpublish(this.state.mainStreamManager)

                  await this.state.session.publish(newPublisher)
                  this.setState({
                      currentVideoDevice: newVideoDevice,
                      mainStreamManager: newPublisher,
                      publisher: newPublisher,
                  });
              }
          }
        } catch (e) {
          console.error(e);
        }
  }

  sendmessageByClick() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          userName: this.state.myUserName,
          text: this.state.message,
          chatClass: 'messages__item--operator',
        },
      ],
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserName},${this.state.message}`,
      to: [],
      type: 'chat',
    });

    this.setState({
      message: '',
    });
  }

  sendmessageByEnter(e) {
    if (e.key === 'Enter') {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            userName: this.state.myUserName,
            text: this.state.message,
            chatClass: 'messages__item--operator',
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserName},${this.state.message}`,
        to: [],
        type: 'chat',
      });

      this.setState({
        message: '',
      });
    }
  }

  handleChatMessageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  readyClick() {
    const mySession = this.state.session;

    if (this.state.isReady === false) {
      mySession.signal({
        to: [],
        type: 'ready-ok',
      })
    } else {
      mySession.signal({
        to: [],
        type: 'ready-cancel'
      })
    }
    this.setState({
      isReady: !this.state.isReady,
    });
  }

  updateHost() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        // https://YOUR_OPENVIDUSERVER_IP/openvidu/api/sessions/SESSION_ID/connection
        url: `https://${window.location.hostname}:4443/openvidu/api/sessions/${
          this.state.mySessionId
        }/connection`,
        
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
        },
        success: (response) => {
          let content = response.content;
          content.sort((a, b) => a.createdAt - b.createdAt);
          console.log(content[0])
          resolve(content[0].clientData);
        },
        error: (error) => reject(error),
      });
    });
  }

  getPlayer() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: `https://${window.location.hostname}:4443/openvidu/api/sessions/${
          this.state.mySessionId
        }/connection`,

        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
        },
        success: (response) => {
          let content = response.content;
          console.log(content)
          console.log(this.state.subscribers)
          resolve(content);
        },
        error: (error) => reject(error),
      })
    })
  }

  start() {
    let players = this.state.subscribers.length +1
    const mySession = this.state.session

    if (players < 3 ) {
      Swal.fire({
        title:'게임에 필요한 인원이 부족합니다.',
        icon: 'error',
        confirmButtonText:'확인',
      })
    } else if (players > 6) {
      Swal.fire({
        title:'인원수가 너무 많습니다.',
        icon: 'error',
        confirmButtonText:'확인',
      })
    } else {
      if ( this.state.readyPlayer !== players ) {
        Swal.fire({
          title:'모든 플레이어가 준비되지 않았습니다.',
          icon: 'error',
          confirmButtonText:'확인',
        })
      } else {
        Swal.fire({
          title:'게임 시작!!',
          confirmButtonText:'확인',
        })
        mySession.signal({
          to: [],
          type: 'game-start'
        })
      }
    }
  };

  choiceA() {
    this.setState({
      servant: '가',
      teamModalState: false,
    })
  }

  choiceB() {
    this.setState({
      servant: '나',
      teamModalState: false,
    })
  }

  gameset() {
    const mySession = this.state.session
    mySession.signal({
      data: 'asdf',
      to: [],
      type: 'winner',
    })
  }

  timeSet() {
    this.setState({
      mm:3,
      ss:0,
    })
  }

  onTopicHandler(event) {
    this.setState({
      topic:event.currentTarget.value
    })
  }

  onSubAHandler(event) { 
    this.setState({
      teamA: event.currentTarget.value
    })
  }

  onSubBHandler(event) { 
    this.setState({
      teamB: event.currentTarget.value
    })
  }

  topicSet() {
    const topic = document.querySelector('#topicInput').value
    const subA123 = document.querySelector('#subAInput').value
    const subB123 = document.querySelector('#subBInput').value
    const mySession = this.state.session
    const topicData = topic+ '***' + subA123 + '***' + subB123
    mySession.signal({
      data:topicData,
      to: [],
      type: 'topic-choice'
    }).then(() => this.setState({topicModalState:false, isKing:true}))
  }

  render(){
    const messages = this.state.messages;
    const sub1 = this.state.subscribers.slice(0,2)
    const sub2 = this.state.subscribers.slice(2,5)
    while (sub1.length < 2) {
      sub1.push(undefined)
    }
    while (sub2.length < 3) {
      sub2.push(undefined)
    }

    return (
      <div className="gamediv">
        {/* 주제 정하는 모달 */}
        <Modal show={this.state.topicModalState} centered>
          <Modal.Header closeButton>
            <Modal.Title>주제를 정해주세요</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="topicInput">
                <Form.Label>주제</Form.Label>
                <Form.Control
                  as = "textarea"
                  autoFocus
                  value={this.state.topic}
                  onChange={this.onTopicHandler}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="subAInput"
              >
                <Form.Label>가.</Form.Label>
                <Form.Control as = "textarea" rows={1} value={this.state.teamA} onChange={this.onSubAHandler}/>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="subBInput"
              >
                <Form.Label>나.</Form.Label>
                <Form.Control as="textarea" rows={1} value={this.state.teamB} onChange={this.onSubBHandler}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.topicSet}>
              게임 시작
            </Button>
          </Modal.Footer>
        </Modal>

        {/* 왕을 제외한 나머지 인원이 팀을 고르는 모달 */}
        <Modal show={this.state.teamModalState} centered>
          <Modal.Header closeButton>
            <Modal.Title>팀을 선택해주세요.</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.topic}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.choiceA}>
              {this.state.teamA}
            </Button>
            <Button variant="primary" onClick={this.choiceB}>
              {this.state.teamB}
            </Button>
          </Modal.Footer>
        </Modal>
        <div className='totaldiv'>
          <div className='cam'>
            <div className='stream-container'>
              <UserVideoComponent isKing={this.state.isKing} streamManager={this.state.publisher} king={ this.state.king } sessionId = {this.state.mySessionId} session = {this.state.session}></UserVideoComponent>
            </div>
            {sub1.map((sub,i) => (
              <div
              key = {i}
              className="stream-container"
              onClick={() => this.handleMainVideoStream(sub)}>
                <UserVideoComponent isKing={this.state.isKing} streamManager={ sub } king={ this.state.king } sessionId = {this.state.mySessionId} session = {this.state.session}/>
              </div>
            ))}
          </div>
          <div className='cam'>
              {sub2.map((sub,i) => (
                <div
                key = {i}
                className="stream-container"
                onClick={() => this.handleMainVideoStream(sub)}>
                  <UserVideoComponent isKing={this.state.isKing} streamManager={ sub } king={ this.state.king } sessionId = {this.state.mySessionId} session = {this.state.session}/>
                </div>
              ))}
          </div>

          <div className="titlediv">
            <div className="title">
              { this.state.servant ==='나'? (
                <div className='subjectcontent'  onClick={() => this.choiceA()}>
                 <div className="subjectdetailnota">
                   <img className='subjecta' alt='RedSubject' src={blue}/>
                   <p className="subjectRight">{this.state.teamA}</p>
                 </div>
                </div>
              ) : <div className='subjectcontent'  onClick={() => this.choiceA()}>
                <div className="subjectdetaila">
                  <img className='subjecta' alt='RedSubject' src={blue}/>
                  <p className="subjectRight">{this.state.teamA}</p>
                </div>
              </div>}
              <div className="titlecontent">
                <p className="subject">안건</p>
                <p className="subjectTopic">{this.state.topic}</p>
              </div>
              { this.state.servant ==='가'? (
                <div className='subjectcontent'  onClick={() => this.choiceB()}>
                 <div className="subjectdetailnotb">
                   <img className='subjecta' alt='RedSubject' src={red}/>
                   <p className="subjectLeft">{this.state.teamB}</p>
                 </div>
                </div>
              ) : <div className='subjectcontent'  onClick={() => this.choiceB()}>
                <div className="subjectdetailb">
                  <img className='subjecta' alt='RedSubject' src={red}/>
                  <p className="subjectLeft">{this.state.teamB}</p>
                </div>
              </div>}
            </div>
          </div>
        </div>

        <div className="chatdiv"> 
          <div className="infobg">
            <div className="timerDiv">
              <p>남은시간: 99:99</p>
            </div>
            <div className="infobox">
              <div className="servantdiv">
                <div className='coindiv'>
                <p>금화 갯수 : 99개</p>
                </div>
                <div className='countdiv'>
                <p>왕이 된 횟수 : 99회</p> 
                </div>
              </div>
            </div>
          </div>

          <div className="chatoutline">
            <div className="chatbg"> 
              <div className="chatbox__messages" ref="chatoutput">
                <Messages messages={messages} />
              </div>
              <div className="chat chatbox__footer">
                <input
                  id="chat_message"
                  type="text"
                  placeholder="Write a message..."
                  onChange={this.handleChatMessageChange}
                  onKeyPress={this.sendmessageByEnter}
                  value={this.state.message}
                  />
                <button
                  className="chat_send"
                  onClick={this.sendmessageByClick}>
                    입력
                </button>
              </div>
            </div>
          </div>

          <div className="icons">
            {this.state.readyState === 'ready'
            ? (this.state.isHost
              ? <img className="ready-icon" alt="start" src={start} onClick={() => this.start()}/>
              : (this.state.isReady === false
                ? <img className="ready-icon" alt="ready" src={ready} onClick={() => this.readyClick()}/>
                : <img className="ready-icon" alt="ready" src={ready_ok} onClick={() => this.readyClick()}/>)
                )
            : <img className="ing-icon" alt="ing" src={ing} />}
            <img className="icon" alt="exit" src={exit} onClick={()=> this.exit()}/>
          </div>
         </div> 
      </div>
    );
  }

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) => this.createToken(sessionId));
  }

  createSession(sessionId) {
      return new Promise((resolve, reject) => {
          var data = JSON.stringify({ customSessionId: sessionId });
          axios
              .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
                  headers: {
                      Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                      'Content-Type': 'application/json',
                  },
              })
              .then((response) => {
                  console.log('CREATE SESION', response);
                  resolve(response.data.id);
              })
              .catch((response) => {
                  var error = Object.assign({}, response);
                  if (error?.response?.status === 409) {
                      resolve(sessionId);
                  } else {
                      console.log(error);
                      console.warn(
                          'No connection to OpenVidu Server. This may be a certificate error at ' +
                          OPENVIDU_SERVER_URL,
                      );
                      if (
                          window.confirm(
                              'No connection to OpenVidu Server. This may be a certificate error at "' +
                              OPENVIDU_SERVER_URL +
                              '"\n\nClick OK to navigate and accept it. ' +
                              'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                              OPENVIDU_SERVER_URL +
                              '"',
                          )
                      ) {
                          window.location.assign(OPENVIDU_SERVER_URL + '/accept-certificate');
                      }
                  }
              });
      });
  }

  createToken(sessionId) {
      return new Promise((resolve, reject) => {
          var data = {};
          axios
              .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions/" + sessionId + "/connection", data, {
                  headers: {
                      Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
                      'Content-Type': 'application/json',
                  },
              })
              .then((response) => {
                  console.log('TOKEN', response);
                  resolve(response.data.token);
              })
              .catch((error) => reject(error));
      });
  }
};

const mapStateToProps = (state) => ({
  user : state.user
})

const mapDispatchToProps = (dispatch) => {
  return {};
};
const HOCTaskDetail = withRouter(Game)
export default connect(mapStateToProps, mapDispatchToProps)(HOCTaskDetail);