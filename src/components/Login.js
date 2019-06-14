import React, { Component } from 'react';
import {VERIFY_USER} from '../Constants';

export default class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fullname: "",
      error:""
    };
  }

  setUser = ({user, isUser})=>{
    console.log(user, isUser)
    if(isUser){
      this.setError("User exist")
    }else{
      this.props.setUser(user)
      this.setError("")
    }
  }

  setError = (error)=> {
    this.setState({error})
  }

  handleSubmit = (e)=> {
    e.preventDefault()
    const { socket } = this.props;
    const { fullname } = this.state;
    socket.emit(VERIFY_USER, fullname, this.setUser)
  }

  handleChange = (e)=> {
    this.setState({fullname:e.target.value})
  }

  render() {
    const { fullname, error } = this.state;
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="Name">
                <h3> Enter your name? </h3>
            </label>
            <input type="text" ref={(input)=>{ this.textInput = input }}
            id="Name" value={fullname} onChange={this.handleChange}
            placeholder={'Username'}/>
            <div>{error ? error:null}</div>
          </form>
      </div>
    );
  }
}
