import React, { Component } from 'react'
import axios from 'axios'

const server = "http://localhost:5000"

class TextToSpeech extends Component {
	state = {
		text: "",
	}

	readText = async () => {
		axios.post( `${server}/speak`, {
			text: this.state.text
		})
			.then(res => {
				const audio = new Audio('data:audio/ogg;base64,' + res.data)
				audio.play()
			})
			.catch(console.log)
	}

	handleChange = (e) => {
		this.setState({text: e.target.value})
	}

	render() {
		return (
			<div>
				<textarea onChange={this.handleChange}></textarea>
				<div></div>

				<button onClick={this.readText}>
					Speak
				</button>
			</div>
		)
	}
}

export default TextToSpeech
