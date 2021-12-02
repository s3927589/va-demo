import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import PropTypes from 'prop-types'
import './chatbot.css'

const MySpeechRecognition = ({ processCommand }) => {
	const [prevListen, setPrevListen] = useState(false)

	const {
		transcript,
		listening,
		browserSupportsSpeechRecognition,
	} = useSpeechRecognition();

	if (!browserSupportsSpeechRecognition) {
		return <span>Browser doesn&apos;t support speech recognition.</span>;
	}

	const startListening = () => {
		SpeechRecognition.startListening({
			// continuous: true,
			language: 'vi-VN',
		})
	}

	if (prevListen && !listening) {
		processCommand(transcript)
	}

	if (prevListen != listening) {
		setPrevListen(listening)
	}

	return (
		<div>
			<div className="user-prompt">{transcript}</div>
			<div
				onClick={startListening}
				className={"btn " + (listening ? "red" : "blue")}
			>
				{listening ? "Dừng" : "Thu Âm"}
			</div>
		</div>
	);
};

MySpeechRecognition.propTypes = {
  processCommand: PropTypes.func,
};


export default MySpeechRecognition;
