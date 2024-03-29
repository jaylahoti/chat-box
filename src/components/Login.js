import React, { Component } from 'react';
import { VERIFY_USER } from '../Constants'

export default class Login extends Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	nickname:"",
	  	error:""
	  };
	}

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { nickname } = this.state
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {
		const { nickname, error } = this.state
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >
					<input
						ref={(input)=>{ this.textInput = input }}
						type="text"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'Enter Your Username'}
						/>
						<div className="error">{error ? error:null}</div>

				</form>
			</div>
		);
	}
}
