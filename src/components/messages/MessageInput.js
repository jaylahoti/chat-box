import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import { MdSend } from 'react-icons/md';
import { FaMicrophone } from 'react-icons/fa';
import { FaRegStopCircle } from 'react-icons/fa'

export default class MessageInput extends Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	message:"",
			audiomessage:false,
			record: false,
	  	isTyping:false
	  };

	}

	startRecording = () => {
	 this.setState({
		 record: true
	 });
 }

 stopRecording = () => {
	 this.setState({
		 record: false
	 });
 }

 onData(recordedBlob) {
	 console.log('chunk of real-time data is: ', recordedBlob);
 }

 onStop = (recordedBlob) => {
	 this.setState({message: recordedBlob.blobURL, audiomessage:true})
	 this.sendMessage()
	 this.setState({message:"", audiomessage:false})
	 console.log('recordedBlob is: ', recordedBlob);
 }

	handleSubmit = (e)=>{
		e.preventDefault()
		this.sendMessage()
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.state.message, this.state.audiomessage)

	}

	componentWillUnmount() {
	  this.stopCheckingTyping()
	}

	sendTyping = ()=>{
		this.lastUpdateTime = Date.now()
		if(!this.state.isTyping){
			this.setState({isTyping:true})
			this.props.sendTyping(true)
			this.startCheckingTyping()
		}
	}

	/*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
	startCheckingTyping = ()=>{
		console.log("Typing");
		this.typingInterval = setInterval(()=>{
			if((Date.now() - this.lastUpdateTime) > 300){
				this.setState({isTyping:false})
				this.stopCheckingTyping()
			}
		}, 300)
	}

	/*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
	stopCheckingTyping = ()=>{
		console.log("Stop Typing");
		if(this.typingInterval){
			clearInterval(this.typingInterval)
			this.props.sendTyping(false)
		}
	}


	render() {
		const { message, audiomessage } = this.state
		return (
			<div className="message-input">
				<form
					onSubmit={ this.handleSubmit }
					className="message-form">

					<input
						id = "message"
						ref = {"messageinput"}
						type = "text"
						className = "form-control"
						value = { message }
						autoComplete = {'off'}
						placeholder = "Type Here"
						onKeyUp = { e => { e.keyCode !== 13 && this.sendTyping() } }
						onChange = {
							({target})=>{
								this.setState({message:target.value})
							}
						}
						/>

						<ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081"
					width="0px" />
        <button disabled={this.state.record}
				className="microphone" onClick={this.startRecording}
				type="button"><FaMicrophone /></button>
        <button disabled={!this.state.record}
				className="stop-button" onClick={this.stopRecording}
				type="button"><FaRegStopCircle /></button>

					<button
						disabled = { message.length < 1 }
						type = "submit"
						className = "send"

					> <MdSend /> </button>
				</form>

			</div>
		);
	}
}
