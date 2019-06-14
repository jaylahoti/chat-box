import React, { Component } from 'react';
import io from 'socket.io-client';
import { USER_CONNECTED, LOGOUT } from '../Constants';
import Login from './Login';

const socketUrl = "http://192.168.1.103:3231"
export default class Layout extends Component {

  //connecting to io socket server

  constructor(props) {
      super(props);

      this.state = {
        socket: null,
        user:null
      };
  }

  componentWillMount() {
      this.initSocket()
  }

  //initializing socket here

  initSocket = ()=>{
    const socket = io(socketUrl)
    socket.on('connect', ()=> {
      console.log("Connected")
    })
    this.setState({socket})
  }

  //USER LOGGIN

  setUser = (user)=>{
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({user})
  }

  //user LOGOUT

  logout = () => {
    const { socket } = this.state
    socket.emit(LOGOUT);
    this.setState({user: null})
  }

  render() {
    const { title } = this.props;
    const { socket } = this.state;
    return (
      <div className="container">
          <Login socket={socket} setUser={this.setUser} />
      </div>
    );
  }
}
