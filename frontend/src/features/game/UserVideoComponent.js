import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import crown from '../../assets/images/kingmark.png'
import './UserVideo.css';
import replacemnet from '../../assets/images/screen_replacement.png'
import camera from '../../assets/images/camera_on_white.png'
import mic from '../../assets/images/mic_on_white.png'

export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
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
                    <div className='micdiv'><img className='mic' src={mic}></img></div>
                    <div className='cameradiv'><img className='camera' src={camera}></img></div>
                </div>
                ) : <div className="box">
                        <img className="replacement" src={replacemnet} alt='screen'></img>
                    </div>}
            </div>
        );
    }
}
