import React, { Component } from 'react'

import * as tf from '@tensorflow/tfjs';
import { connect } from 'react-redux';
import axios from 'axios'
import PropTypes from 'prop-types'

import MySpeechRecognition from './SpeechRecognition'
import classes from '../chatbot_js_model/classes.json'
import words from '../chatbot_js_model/words.json'
import intents_raw from '../chatbot_js_model/intents.json'
import { updateCommand } from '../redux/actionCreators'

import { KHONG_TIM_THAY, THEM_O_TO, THONG_TIN_O_TO, GIOI_THIEU } from './TaskConfig'
import './chatbot.css'

const server = "http://localhost:5000"
const ignore_letters = ["?", ",", ".", "!"]
const intents = intents_raw["intents"]

let timecount = (new Date()).getTime()

class ChatBot extends Component {
	state = {
		model: null,
		loadModel: false,
		response: ""
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

	readText = (text, label) => {
		let update = true
		if (label === KHONG_TIM_THAY) {
			update = false
			text = "Ô tô bạn cần tìm không có trong hệ thống"
		}

		axios.post( `${server}/speak`, { text })
			.then(res => {
				const audio = new Audio('data:audio/ogg;base64,' + res.data)
				audio.play()
				if (update)
					this.props.updateCommand(label)
				if (label === GIOI_THIEU) {
					text = "Công ty trách nhiệm hữu hạn ô tô Isuzu việt nam … xe ô tô"
				}
				this.setState({response: text})
			})
			.catch(console.log)
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
		if (belong) {
			const dataTensor = tf.tensor2d(data, [data.length, 36]);

			// predict
			const pred = this.state.model.predict(dataTensor)

			// postpropcess
			const index = parseInt(pred.argMax(-1).dataSync()[0])
			label = classes[index]
			response = this.getResponse(label)
		}

		if (label === THONG_TIN_O_TO || label === THEM_O_TO) {
			text = this.stringToSlug(text).toLowerCase()
			if (text.match(/ben/gi)) {
				label += "-1"
				response += "Ben"
			} else if (text.match(/dong lanh/gi) || text.match(/dong/gi)) {
				label += "-2"
				response += "Đông Lạnh"
			} else if (text.match(/xang dau/gi) || text.match(/xang/gi)) {
				label += "-3"
				response += "Bồn Xăng Dầu"
			} else if (text.match(/mui bat/gi) || text.match(/mui/gi)) {
				label += "-4"
				response += "Thùng Mui Bạt"
			} else {
				label = KHONG_TIM_THAY
			}

			if (label.match(new RegExp(THONG_TIN_O_TO, "gi")))
				response += " đây ạ"
			else
				response += " vào kho xe của bạn"
		}

		this.readText(response, label)
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
