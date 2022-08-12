// css
import './Game.css';

// img파일
import invite from '../../assets/images/invite.png'
import exit from '../../assets/images/exit.png'
import ready from '../../assets/images/ready.png'
import ready_ok from '../../assets/images/ready_ok.png'
import start from '../../assets/images/start.png'

// 컴포넌트
import axios1 from '../../common/api/http-common';
import UserVideoComponent from './UserVideoComponent'
import Messages from './Messages'
import Timer from './Timer'
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, createRef } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery'; 
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'
import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

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
        mySessionId: this.props.params.id,
        myUserName: undefined,
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
        kingCount : 0,
        coin: 0,
        token: undefined,
        timeOut: false,
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
    this.myref = React.createRef();
  }

  // 처음 방을 들어갔을 때 실행
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    setTimeout(()=> {
      // storage에서 login한 user 정보 가져오기
      let loginInfoString = window.sessionStorage.getItem("login_user");
      let loginInfo = JSON.parse(loginInfoString)
      let token = window.sessionStorage.getItem('token')
      this.setState({
        token,
        myUserName : loginInfo.name,
      })

      // 플레이어 입장
      axios1.post(`/game/common/join?gameConferenceRoomUid=${this.state.mySessionId}&userId=${loginInfo.id}`).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })

      // 플레이어 세션 입장
      this.joinSession();
    }, 500);
  }

  // 방을 떠날 때 실행
  componentWillUnmount() {
    setTimeout(() => {
      let loginInfoString = window.sessionStorage.getItem("login_user");
      let loginInfo = JSON.parse(loginInfoString)
      axios1.post(`/game/common/quit?gameConferenceRoomUid=${this.state.mySessionId}&userId=${loginInfo.id}`).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
      if (!this.state.isLeaved) {
        this.leaveSession();
      }
    }, 500);
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

              mySession.on('signal:topic-choice', (event) =>{
                this.setState({
                  readyState: 'start',
                })
                const topics = event.data.split('***')
                const title = document.querySelector('.subjectcontent')
                const suba = document.querySelector('.subjecta')
                const subb = document.querySelector('.subjectb')
                title.innerText = topics[0]
                suba.innerText = '가. ' + topics[1]
                subb.innerText = '나. ' + topics[2]
                this.timeSet().then(() => alert('주제가 공개되었습니다.'))
              })

              // 플레이어 정보 갱신
              mySession.on('signal:check-yourposition', (event) => {
                // http://localhost:8081/api/game/common/player-info?userID=rkdqudtn1
                let loginInfoString = window.sessionStorage.getItem("login_user");
                let loginInfo = JSON.parse(loginInfoString)
                axios1.get(`/game/common/player-info?userID=${loginInfo.id}`).then((response) => {
                  console.log(response.data)
                  this.setState({
                    coin: response.data.goldfinch,
                    kingCount: response.data.kingCount,
                  })
                  if (response.data.roleUid === 1) {
                    alert('당신은 왕 입니다.')
                    this.setState({
                      isKing: true,
                      servant: undefined,
                      timeOut:true,
                    })
                  } else {
                    if (response.data.team === "A") {
                      alert('당신은 가. 입니다.')
                      this.setState({
                        isKing: false,
                        servant: '가',
                        timeOut:true,
                      })
                    } else{
                      alert('당신은 나. 입니다.')
                      this.setState({
                        isKing: false,
                        servant: '나',
                        timeOut:true,
                      })
                    }
                  }
                }).catch((err) => {
                  console.log(err)
                })
              })

              mySession.on('signal:choice-a', ()=> {
                alert('왕이 가. 를 선택하였습니다.')
                this.setState({
                  isKing: false,
                  servant: undefined,
                  timeOut: false,
                }).then(() => this.timeEnd())
              })

              mySession.on('signal:choice-b', ()=> {
                alert('왕이 나. 를 선택하였습니다.')
                this.setState({
                  isKing:false,
                  servant: undefined,
                  timeOut: false,
                }).then(() =>this.timeEnd())
              })

              mySession.on('signal:time-out', (event) =>{
                alert('왕이 시간 내 선택을 하지 못하였습니다. 왕을제외한 모든 플레이어가 코인을 하나씩 받습니다.')
                this.setState({
                  isKing: false,
                  servant: undefined,
                })
              })

              mySession.on('signal:winner', (event)=> {
                alert(`승자는 ${event.data}님 입니다.`)
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
    setTimeout(()=> {
      let loginInfoString = window.sessionStorage.getItem("login_user");
      let loginInfo = JSON.parse(loginInfoString)
      // http://localhost:8081/api/game/common/ready?userID=rkdqudtn3 
      axios1.post(`/game/common/ready?userID=${loginInfo.id}`).then((response) => {
        console.log('응답')
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
    }, 500);

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
          resolve(content);
        },
        error: (error) => reject(error),
      })
    })
  }

  start() {
    let players = this.state.subscribers.length +1

    if (players < 3 ) {
      alert('게임에 필요한 인원이 부족합니다.')
    } else if (players > 7) {
      alert('인원 수 가 너무 많습니다.')
    } else {
      if ( this.state.readyPlayer !== players ) {
        alert('모든 플레이어가 준비되지 않았습니다.')
      } else {
        alert('게임 시작!!')
        this.setState ({
          readyState : 'start'
        })
        setTimeout(()=> {
          // http://localhost:8081/api/game/common/game-start?gameConferenceRoomUid=3
          axios1.post(`/game/common/game-start?gameConferenceRoomUid=${this.state.mySessionId}`).then(() => {
            axios1.post(`/game/normal/round-start?gameConferenceRoomUid=${this.state.mySessionId}`).then((response) =>{
              console.log(response.data)
              const mySession = this.state.session
              const topicData = `${response.data.topic}***${response.data.answerA}***${response.data.answerB}`
              mySession.signal({
                data: topicData,
                to: [],
                type: 'topic-choice',
              })
            }).then(() =>  {
              const mySession = this.state.session
              mySession.signal({
                to: [],
                type: 'check-yourposition'
              })
            })
          }).catch((err) => {
            console.log(err)
          })
        }, 500);

      }
    }
  };

  choiceA() {
    // http://localhost:8081/api/game/normal/round-end?gameConferenceRoomUid=3&winTeam=A
    axios1.post(`/game/normal/round-end?gameConferenceRoomUid=${this.state.mySessionId}&winTeam=A`)

    const mySession = this.state.session

    mySession.signal({
      to:[],
      type:'choice-a'
    }).then(() => {
      axios1.post(`/game/normal/round-start?gameConferenceRoomUid=${this.state.mySessionId}`).then((response) =>{
        console.log(response.data)
        const mySession = this.state.session
        if ( response.data.userId === null) {
          const topicData = `${response.data.topic}***${response.data.answerA}***${response.data.answerB}`
          mySession.signal({
            data: topicData,
            to: [],
            type: 'topic-choice',
          }).then(() =>  {
            const mySession = this.state.session
            mySession.signal({
              to: [],
              type: 'check-yourposition'
            })
          })
        } else {
          axios1.post(`/game/normal/game-end?gameConferenceRoomUid=${this.state.mySessionId}&userId=${response.data.userId}`).then(() => {
            mySession.signal({
              data: response.data.userNickname,
              to: [],
              type: 'winner'
            })
          })
        }
      })
    })
  }

  choiceB() {
    // http://localhost:8081/api/game/normal/round-end?gameConferenceRoomUid=3&winTeam=A
    axios1.post(`/game/normal/round-end?gameConferenceRoomUid=${this.state.mySessionId}&winTeam=B`)

    const mySession = this.state.session

    mySession.signal({
      to:[],
      type:'choice-b'
    }).then(() => {
      axios1.post(`/game/normal/round-start?gameConferenceRoomUid=${this.state.mySessionId}`).then((response) =>{
        console.log(response.data)
        const mySession = this.state.session
        if ( response.data.userId === null) {
          const topicData = `${response.data.topic}***${response.data.answerA}***${response.data.answerB}`
          mySession.signal({
            data: topicData,
            to: [],
            type: 'topic-choice',
          }).then(() =>  {
            const mySession = this.state.session
            mySession.signal({
              to: [],
              type: 'check-yourposition'
            })
          })
        } else {
          axios1.post(`/game/normal/game-end?gameConferenceRoomUid=${this.state.mySessionId}&userId=${response.data.userId}`).then(() => {
            mySession.signal({
              data: response.data.userNickname,
              to: [],
              type: 'winner'
            })
          })
        }
      })
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
    this.myref.current.resetTimer();
  }

  timeEnd() {
    this.myref.current.endTimer();
  }
  
  timeOver() {
    if (this.state.isKing) {
      axios1.post(`/game/normal/time-out?gameConferenceRoomUid=${this.state.mySessionId}`)
      const mySession = this.state.session

      mySession.signal({
        to: [],
        type: 'time-out'
      }).then(() => {
        axios1.post(`/game/normal/round-start?gameConferenceRoomUid=${this.state.mySessionId}`).then((response) =>{
        console.log(response.data)
        const mySession = this.state.session
        if ( response.data.userId === null) {
          const topicData = `${response.data.topic}***${response.data.answerA}***${response.data.answerB}`
          mySession.signal({
            data: topicData,
            to: [],
            type: 'topic-choice',
          }).then(() =>  {
            const mySession = this.state.session
            mySession.signal({
              to: [],
              type: 'check-yourposition'
            })
          })
        } else {
          axios1.post(`/game/normal/game-end?gameConferenceRoomUid=${this.state.mySessionId}&userId=${response.data.userId}`).then(() => {
            mySession.signal({
              data: response.data.userNickname,
              to: [],
              type: 'winner'
            })
          })
        }
      })
    })}
  }

  render(){
    const messages = this.state.messages;
    const sub1 = this.state.subscribers.slice(0,3)
    const sub2 = this.state.subscribers.slice(3,6)
    // let loginInfoString = window.sessionStorage.getItem("login_user");
    // let loginInfo = JSON.parse(loginInfoString)

    console.log(this.state.subscribers)
    return (
      <div className="gamediv">
        <div className="camdiv">
          {sub1.map((sub,i) => (
            <div
              key={i}
              className="stream-container"
              onClick={() => this.handleMainVideoStream(sub)}
              >
              <UserVideoComponent streamManager={ undefined } />
            </div>
          ))}
        </div>
        <div className="kingdiv">
          <div className="stream-container">
            <UserVideoComponent streamManager={this.state.publisher} />
          </div>
          <div className="titlediv">
            <div className="title">
              <div className="titlecontent">
                <Timer ref={this.myref} timeOver={this.timeOver.bind(this)} state={this.state}></Timer>  
                <p className="subject">안건</p>
                <p className="subjectcontent">남녀사이엔 친구가 존재하는가.</p>
                <p className="subjecta">가. 남녀사이엔 친구가 존재 한다.</p>
                <p className="subjectb">나. 아니다. 남녀사이에 친구가 왠 말이냐</p>
              </div>
              {this.state.readyState === 'start' ? (
                this.state.isKing === true? (
                  <div className='buttondiv'>
                    <Button className="button" variant="danger" onClick={() => this.choiceA()}>가. </Button>{' '}
                    <Button className="button" variant="warning" onClick={() => this.choiceB()}>나. </Button>
                  </div>
                ) : (this.state.servant === '가' ? 
                  <div className="servantdiv">
                    <p>가. 진영</p>
                    <div className="servantinfo">
                      <p>코인 : {this.state.coin}개</p>
                      <p>왕 : {this.state.kingCount}회</p>
                    </div>
                  </div>
                 : (this.state.servant ==='나' ?
                 <div className="servantdiv">
                  <p>나. 진영</p>
                  <div className="servantinfo">
                   <p>코인 : {this.state.coin}개</p>
                   <p>왕 : {this.state.kingCount}회</p>
                  </div>
                 </div>
                 : null))
              ): null}
            </div>
          </div>
        </div>
        <div className="camdiv">
          {sub2.map((sub,i) => (
            <div
              key={i}
              className="stream-container"
              onClick={() => this.handleMainVideoStream(sub)}
              >
              <UserVideoComponent streamManager={ undefined } />
            </div>
          ))}
        </div>
        <div className="chatdiv">
          <div className="chatbg"> 
            <div className="chatbox">
              <div className="chatbox__messages" ref="chatoutput">
                {/* {this.displayElements} */}
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
                <p
                  className="chat chatbox__send--footer"
                  onClick={this.sendmessageByClick}
                >
                  보내기
                </p>
              </div>
            </div>
          </div>
          <div className="icons">
            {this.state.isHost === true ? (
              <img className="ready-icon" alt="start" src={start} onClick={() => this.start()}/>
            ):(this.state.isReady === false ?
              <img className="ready-icon" alt="ready" src={ready} onClick={() => this.readyClick()}/>
              :<img className="ready-icon" alt="ready" src={ready_ok} onClick={() => this.readyClick()}/>)}
            <img className="icon" alt="invite" src={invite} onClick= {() => this.timeOver()}/>
            <img className="icon" alt="exit" src={exit} onClick={() => this.updateHost()}/>
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