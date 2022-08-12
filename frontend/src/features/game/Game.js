import './Game.css';
import invite from '../../assets/images/invite.png'
import exit from '../../assets/images/exit.png'
import ready from '../../assets/images/ready.png'
import ready_ok from '../../assets/images/ready_ok.png'
import start from '../../assets/images/start.png'
import axios from 'axios';
import axios1 from '../../common/api/http-common';
import { OpenVidu } from 'openvidu-browser';
import React, { Component, createRef } from 'react';
import UserVideoComponent from './UserVideoComponent'
import Messages from './Messages'
import { useParams } from 'react-router-dom';
import $ from 'jquery'; 
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux'

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443';
const OPENVIDU_SERVER_SECRET = 'MY_SECRET';

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
        coin : 0,
        kingCount : 0,
        kingList: [],
        token: undefined,
        ReadyImg : "ready-icon",
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

  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
    setTimeout(()=> {
      let loginInfoString = window.sessionStorage.getItem("login_user");
      let loginInfo = JSON.parse(loginInfoString)
      let token = window.sessionStorage.getItem('token')
      this.setState({
        token,
        myUserName : loginInfo.name,
      })
      // curl -X POST "http://localhost:8081/api/game/common/join?gameConferenceRoomUid=3&userId=ehddn52521" -H "accept: */*" -d ""
      axios1.post(`/game/common/join?gameConferenceRoomUid=${this.state.mySessionId}&userId=${loginInfo.id}`).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.log(err)
      })
      this.joinSession();
    }, 500);
  }

  componentWillUnmount() {
    window.location.reload();
    window.removeEventListener('beforeunload', this.onbeforeunload);
    if (!this.state.leaved) {
      this.leaveSession();
    }
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

              mySession.on('signal:game-start', (event)=>{
                this.setState({
                  readyState: 'start'
                })
              })

              mySession.on('signal:random-king', (event) => {
                alert('이번 왕은' + event.data + '님입니다.')
                if (this.state.myUserName === event.data) {
                  this.setState({
                    isKing: true,
                    servant: undefined,
                  })
                } else {
                  this.setState({
                    isKing: false,
                    servant: undefined,
                  })
                }
              })

              mySession.on('signal:you-are-a', (event) => {
                this.setState({
                  isKing:false,
                  servant:'가',
                })
              })

              mySession.on('signal:you-are-b', (event)=> {
                this.setState({
                  isKing:false,
                  servant:'나',
                })
              })

              mySession.on('signal:topic-choice', (event) =>{
                const topics = event.data.split('***')
                const title = document.querySelector('.subjectcontent')
                const suba = document.querySelector('.subjecta')
                const subb = document.querySelector('.subjectb')
                title.innerText = topics[0]
                suba.innerText = '가. ' + topics[1]
                subb.innerText = '나. ' + topics[2]
                alert(`이번 주제는 ${topics[0]} 입니다.`)
              })

              mySession.on('signal:choice-a', (event) => {
                alert('왕이 가. 를 선택하였습니다.')
                if (this.state.servant === '가') {
                  this.setState({
                    coin: this.state.coin +1
                  })
                  alert('코인을 1개 휙득하였습니다.')
                }
              })

              mySession.on('signal:choice-b', (event) => {
                alert('왕이 나. 를 선택하였습니다.')
                if (this.state.servant === '나') {
                  this.setState({
                    coin : this.state.coin + 1
                  })
                  alert('코인을 1개 휙득하였습니다.')
                }
              })

              mySession.on('signal:countcoin', (event) => {
                if (this.state.coin > 1) {
                  mySession.signal({
                    data: this.state.myUserName,
                    to: [],
                    type:'doublecoin'
                  })
                }
              })

              mySession.on('signal:doublecoin', (event) => {
                if (!this.state.kingList.includes(event.data)) {
                  this.setState({
                    kingList : [...this.state.kingList, event.data]
                  })
                }
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

  onCursor() {
    this.setState({
      ReadyImg: ''
    })
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

  getRandomKing() {
    this.getPlayer().then((content) => {
      const RandomKing = _.sample(content)
      console.log(JSON.parse(RandomKing.clientData).clientData)
      console.log(content)
      const mySession = this.state.session
      mySession.signal({
        data: JSON.parse(RandomKing.clientData).clientData,
        to: [],
        type: 'random-king'
      }).then()
      
      for (var i = 0; i < content.length; i++) {
        if (content[i] === RandomKing) {
          content.splice(i,1);
          i--;
        }
      }
      console.log(content)
      console.log('왕빼고 남은 유저' + content)
      
      let len = content.length / 2
      console.log(len)
      if ( len % 1 === 0.5) {
        const x = _.sample([0.5 , -0.5])
        len = len + x
      }
      console.log(len)

      let suba = _.sampleSize(content, len)
      let subb = content.filter((element) => !suba.includes(element))
      console.log('hi')
      console.log(suba)
      mySession.signal({
        to: suba,
        type: 'you-are-a'
      })
      console.log(subb)
      mySession.signal({
        to: subb,
        type: 'you-are-b'
      })
    });
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

        const mySession = this.state.session
        mySession.signal({
          to: [],
          type: 'game-start'
        })
        .then(this.getRandomKing())
        .then(this.choiceTopic());
      }
    }
  };

  choiceTopic() {
    const topic1 = {
      "topic":"안건1",
      "answer_A":"A1",
      "answer_B":"B1",
      }
    const topic2 = {
      "topic":"안건2",
      "answer_A":"A2",
      "answer_B":"B2",
      }
    const topic3 = {
      "topic":"안건3",
      "answer_A":"A3",
      "answer_B":"B3",
    }
    const topics = [topic1, topic2, topic3]

    const topic = _.sample(topics)
    console.log(topic)
    const mySession = this.state.session
    mySession.signal({
      data: `${topic.topic}***${topic.answer_A}***${topic.answer_B}`,
      to: [],
      type: 'topic-choice',
    })
  }

  async choiceA() {
    const mySession = this.state.session
    
    mySession.signal({
      to:[],
      type:'choice-a'
    })
    await mySession.signal({
      to:[],
      type:'countcoin',
    })
  }

  async choiceB() {
    const mySession = this.state.session
    
    mySession.signal({
      to:[],
      type:'choice-b'
    })
    await mySession.signal({
      to:[],
      type:'countcoin',
    })
  }

  countCoin() {
    const mySession = this.state.session
    mySession.signal({
      to: [],
      type:'countcoin',
    })
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
                 : 
                 <div className="servantdiv">
                  <p>나. 진영</p>
                  <div className="servantinfo">
                    <p>코인 : {this.state.coin}개</p>
                    <p>왕 : {this.state.kingCount}회</p>
                  </div>
                 </div>)
              ): null}
              {/* {this.state.isKing === true ? (
                <div className='buttondiv'>
                  <Button className="button" variant="danger">가. </Button>{' '}
                  <Button className="button" variant="warning">나. </Button>
                </div>
              ): null} */}
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
              <img className="ready-icon" alt="ready" src={ready} onClick={() => this.readyClick()} onMouseEnter/>
              :<img className="ready-icon" alt="ready" src={ready_ok} onClick={() => this.readyClick()}/>)}
            <img className="icon" alt="invite" src={invite} onClick= {() => console.log(this.props)}/>
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