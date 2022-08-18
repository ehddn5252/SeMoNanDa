import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import crown from '../../assets/images/kingmark.png'
import './UserVideo.css';
import replacemnet from '../../assets/images/screen_replacement.png'
import camera from '../../assets/images/camera_on_white.png'
import cameraOFF from '../../assets/images/camera_off_white.png'
import mic from '../../assets/images/mic_on_white.png'
import micOFF from '../../assets/images/mic_off_white.png'
import axios1 from '../../common/api/http-common';

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    changeMic() {
        console.log(JSON.parse(this.props.streamManager.stream.connection.data).clientData);
        const micimg = document.querySelector('.mic')
        console.log(micimg.src.split('/'))
        console.log(mic)
        if (micimg.src === mic) {
            micimg.src = mic
        } else {
            micimg.src = micOFF
        } 
        var userId = JSON.parse(this.props.streamManager.stream.connection.data).clientData;
        axios1.get(`/room/url?url=${this.props.sessionId}`).then((response) => {
            axios1.post(`/game/common/penalty?gameConferenceRoomUid=${response.data.uid}&userID=${userId}&penalty=0`).then((response) => {
   
                this.props.session.signal({
                    to: [],
                    type: 'penaltyChange',
                  });
              }).catch((err) => {
                console.log(err)
              }) 
          }).catch((err) => {
            console.log(err)
          })
        
    }
    changeVid() {
        console.log(JSON.parse(this.props.streamManager.stream.connection.data).clientData);
        const vid = document.querySelector('.camera')
        if (vid.src === camera ) {
            vid.src = cameraOFF
        } else {
            vid.src = camera
        }
        var userId = JSON.parse(this.props.streamManager.stream.connection.data).clientData;
        axios1.get(`/room/url?url=${this.props.sessionId}`).then((response) => {
            axios1.post(`/game/common/penalty?gameConferenceRoomUid=${response.data.uid}&userID=${userId}&penalty=1`).then((response) => {
                this.props.session.signal({
                    to: [],
                    type: 'penaltyChange',
                  });
            }).catch((err) => {
                console.log(err)
              })
          }).catch((err) => {
            console.log(err)
          })
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
