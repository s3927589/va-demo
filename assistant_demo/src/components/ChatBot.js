import React, { Component } from 'react'

import * as tf from '@tensorflow/tfjs';
import { connect } from 'react-redux';
import axios from 'axios'
import PropTypes from 'prop-types'

import MySpeechRecognition from './SpeechRecognition'
import classes from '../chatbot_js_model/classes.json'
import words from '../chatbot_js_model/words.json'
import intents_raw from '../chatbot_js_model/intents.json'
import intents_audio_raw from '../chatbot_js_model/intents_audio.json'
import car_config from '../config/CarConfig.json'
import { updateCommand } from '../redux/actionCreators'
import  { audioFiles } from '../config/AudioConfig'

import { KHONG_TIM_THAY, THEM_O_TO, THONG_TIN_O_TO, GIOI_THIEU } from './TaskConfig'
import './chatbot.css'

const server = "http://localhost:5000"
const ignore_letters = ["?", ",", ".", "!"]
const intents = intents_raw["intents"]
const intents_audio = intents_audio_raw["intents"]

let timecount = (new Date()).getTime()

class ChatBot extends Component {
	state = {
		model: null,
		loadModel: false,
		response: "",
		myCars: car_config.cars
	}

	componentDidMount() {
		if (!this.state.loadModel) {
			tf.loadLayersModel('http://localhost:5000/model.json')
				.then(model => {
					this.setState({model})
				})
				.catch(console.log)
			this.setState({ loadModel: true })
		}
	}

	readText = (text, label, audioName) => {
		let update = true
		if (label === KHONG_TIM_THAY) {
			update = false
			text = "Ô tô bạn cần tìm không có trong hệ thống"
			audioName = "khong_tim_thay"
		}

		// console.log(document.currentScript.src)
		// const audio = new Audio("./audio/" + audioName + ".m4a")
		console.log(audioFiles)
		console.log(audioName)
		console.log(audioFiles[audioName])
		const audio = new Audio(audioFiles[audioName])
		audio.play()
		if (update)
			this.props.updateCommand(label)
		if (label === GIOI_THIEU) {
			text = "Hyundai Đại Lý Uỷ Quyền Chính Thức ..."
		}
		this.setState({response: text})
		// axios.post( `${server}/speak`, { text })
		// 	.then(res => {
		// 		const audio = new Audio('data:audio/ogg;base64,' + res.data)
		// 		audio.play()
		// 		if (update)
		// 			this.props.updateCommand(label)
		// 		if (label === GIOI_THIEU) {
		// 			text = "Công ty trách nhiệm hữu hạn ô tô Isuzu việt nam … xe ô tô"
		// 		}
		// 		this.setState({response: text})
		// 	})
		// 	.catch(console.log)
	}

	getCarName = (id) => {
		let car;
		for (let i = 0; i < this.state.myCars.length; i++) {
			car = this.state.myCars[i];
			if (car.id === id) {
				return car.name
			}
		}

		return "này"
	}

	checkName = (text, name) => {
		let wordList = name.split(' ')
		let regexList = [new RegExp(name, "gi")]
		for (let i = 0; i < wordList.length; i++) {
			if (wordList[i] === "Hyundai")
				continue

			regexList.push(new RegExp(wordList[i], "gi"))
		}

		let score = 0;
		for (let i = 0; i < regexList.length; i++) {
			if (text.match(regexList[i]))
				score++;
		}

		return score;
	}

	preprocess = (text) => {
		// split words
		let word_list = text.split(" ")
		let clean_list = []
		let word = ""
		for (let i = 0; i < word_list.length; i++) {
			word = word_list[i].toLowerCase();
			if (ignore_letters.includes(word))
				continue;

			clean_list.push(word)
		}

		// bag of words
		let bag = [[]]
		for (let i = 0; i < words.length; i++) {
			word = words[i]
			if (clean_list.includes(word)) {
				bag[0].push(1)
			} else {
				bag[0].push(0)
			}
		}

		return bag
	}

	getResponse = (label) => {
		let intent = null;
		let res_list = null;
		let index = 0;
		for (let i = 0; i < intents.length; i++) {
			intent = intents[i]
			if (intent.tag !== label)
				continue;

			res_list = intent.responses
			index = Math.floor(Math.random() * res_list.length)
			return res_list[index]
		}

		return "Tôi không nghe rõ. Bạn có thể nói lại được không?"
	}

	getAudioName = (label) => {
		let intent = null;
		let res_list = null;
		let index = 0;
		for (let i = 0; i < intents_audio.length; i++) {
			intent = intents_audio[i]
			if (intent.tag !== label)
				continue;

			res_list = intent.responses
			index = Math.floor(Math.random() * res_list.length)
			return res_list[index]
		}

		return "Tôi không nghe rõ. Bạn có thể nói lại được không?"
	}

	stringToSlug = (str) => {
		// remove accents
		var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
		  to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
		for (var i=0, l=from.length ; i < l ; i++) {
		str = str.replace(RegExp(from[i], "gi"), to[i]);
		}

		str = str.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\-]/g, '-')
			.replace(/-+/g, '-');

		return str;
	}

	processCommand = (text) => {
		// preprocess
		let current = (new Date()).getTime()
		if (current - timecount < 2000)
			return;
		timecount = current

		const data = this.preprocess(text)
		let belong = false
		for (let i = 0; i < data[0].length; i++) {
			if (data[0][i] == 1) {
				belong = true
				break
			}
		}

		let label = "not_belong"
		let response = "Tôi không nghe rõ. Bạn có thể nói lại được không?"
		let audioName = "not_belong"
		if (belong) {
			const dataTensor = tf.tensor2d(data, [data.length, words.length]);

			// predict
			const pred = this.state.model.predict(dataTensor)

			// postpropcess
			const index = parseInt(pred.argMax(-1).dataSync()[0])
			label = classes[index]
			response = this.getResponse(label)
			audioName = this.getAudioName(label)
		}

		if (label === THONG_TIN_O_TO || label === THEM_O_TO) {
			text = this.stringToSlug(text).toLowerCase()
			let car, chosenCar, score;
			let maxScore = 0;
			for (let i = 0; i < this.state.myCars.length; i++) {
				car = this.state.myCars[i];
				score = this.checkName(text, car.name)
				if (score > maxScore) {
					chosenCar = car;
					maxScore = score;
				}
			}

			if (maxScore == 0) {
				if (!text.match(/hyundai/gi) && label === THEM_O_TO) {
					let id = window.location.pathname.split('/')[1]
					console.log(id)
					if (/^\d+$/.test(id)) {
						label += "-" + id
						response += this.getCarName(id)
						audioName += "-" + id
					} else {
						label = KHONG_TIM_THAY
					}
				} else {
					label = KHONG_TIM_THAY
				}
			} else {
				label += "-" + chosenCar.id
				response += chosenCar.name
				audioName += "-" + chosenCar.id
			}

			if (label.match(new RegExp(THONG_TIN_O_TO, "gi")))
				response += " đây ạ"
			else
				response += " vào kho xe của bạn"
		}

		this.readText(response, label, audioName)
	}

	render() {
		return (
			<div className="chatbot-container">
				<div className="chatbot-prompt">{this.state.response}</div>
				<MySpeechRecognition processCommand={this.processCommand} />
			</div>
		);
	}
}

ChatBot.propTypes = {
	updateCommand: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
	updateCommand: (commandType) => dispatch(updateCommand(commandType))
})

export default connect(null, mapDispatchToProps)(ChatBot)
