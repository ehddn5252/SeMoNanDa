import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import crown from '../../assets/images/kingmark.png'
import './UserVideo.css';
import replacemnet from '../../assets/images/screen_replacement.png'
import camera from '../../assets/images/camera_on_white.png'
import mic from '../../assets/images/mic_on_white.png'
import axios1 from '../../common/api/http-common';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    changeMic() {
        console.log(JSON.parse(this.props.streamManager.stream.connection.data).clientData);
        var userId = JSON.parse(this.props.streamManager.stream.connection.data).clientData;
        axios1.get(`/room/url?url=${this.props.sessionId}`).then((response) => {
            console.log('방정보')
            console.log(response)
            axios1.post(`/game/common/penalty?gameConferenceRoomUid=${response}&userID=${userId}&penalty=0`).then((response) => {
                console.log('응답')
                console.log(response)
              }).catch((err) => {
                console.log(err)
              })
          }).catch((err) => {
            console.log(err)
          })
        
    }
    changeVid() {
        console.log(JSON.parse(this.props.streamManager.stream.connection.data).clientData)
    }

    render() {
        return (
            <div className='streamdiv'>
                {this.props.streamManager !== undefined ? (
                     this.getNicknameTag() === this.props.king ? (
                        <div className="kingstreamcomponent">
                            <OpenViduVideoComponent streamManager={this.props.streamManager} />
                            <div className='crowndiv'><img className='crown' src={crown}></img></div>
                            <div className='miccontroldiv'><img className='mic' src={mic}></img></div>
                            <div className='camcontroldiv'><img className='camera' src={camera}></img></div>
                        </div>
                    )
                : <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={this.props.streamManager} />
                    <div className='micdiv' onClick={() => this.changeMic()}><img className='mic' src={mic}></img></div>
                    <div className='cameradiv' onClick={() => this.changeVid()}><img className='camera' src={camera}></img></div>
                </div>
                ) : <div className="box">
                        <img className="replacement" src={replacemnet} alt='screen'></img>
                    </div>}
            </div>
        );
    }
}
