import React, { Component } from 'react';
import {VERIFY_USER} from '../Constants';

export default class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      error:""
    };
  }

  setUser = ({user, isUser})=>{
    if(isUser){
      this.setError("User exist")
    }else{
      this.props.setUser(user)
    }
  }

  setError = (error)=> {
    this.setState({error})
  }

  handleSubmit = (e)=> {
    e.preventDefault()
    const { socket } = this.props;
    const { name } = this.state;
    socket.emit(VERIFY_USER, name, this.setUser)
  }

  handleChange = (e)=> {
    this.setState({name:e.target.value})
  }

  render() {
    const { name } = this.state;
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="Name">
                <h3> Enter your name? </h3>
            </label>
            <input type="text" ref={(input)=>{ this.textInput = input }}
            id="Name" value={name} onChange={this.handleChange}
            placeholder={'Username'}/>
            <div>{error ? error:null}</div>
          </form>
      </div>
    );
  }
}
