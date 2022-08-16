import React, { Component } from 'react';
import OpenViduVideoComponent from './OvVideo';
import crown from '../../assets/images/crown.png'
import './UserVideo.css';


export default class UserVideoComponent extends Component {

    getNicknameTag() {
        // Gets the nickName of the user
        return JSON.parse(this.props.streamManager.stream.connection.data).clientData;
    }

    render() {
        return (
            <div>
                {this.props.streamManager !== undefined ? (
                     this.getNicknameTag() === this.props.king ? (
                        <div className="kingstreamcomponent">
                            <OpenViduVideoComponent streamManager={this.props.streamManager} />
                            <div className='crowndiv'><img className='crown' src={crown}></img></div>
                        </div>
                    )
                : <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={this.props.streamManager} />
                </div>
                ) : <div className="box"></div>}
            </div>
        );
    }
}
