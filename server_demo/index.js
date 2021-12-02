// Require express and create an instance of it
var express = require('express');
const bodyParser = require('body-parser')
var app = express();
const cors = require('cors');
const googleTTS = require('google-tts-api'); // CommonJS
const fs = require('fs')

const model_json = require("./chatbot_js_model/model.json");
const model_bin = fs.readFileSync("./chatbot_js_model/group1-shard1of1.bin")

app.use(cors({
	origin: 'http://localhost:3000'
}));

app.use(bodyParser.json())

// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.send('Minh Anh server');
});


// text to speech
app.post('/speak', function (req, res) {
	googleTTS
		.getAudioBase64(req.body.text, {
			lang: 'vi',
			slow: false,
			host: 'https://translate.google.com',
			timeout: 2000,
		})
		.then(response => {
			res.send(response)
		}) // base64 text
  .catch(console.error);
});

// model
app.get('/model.json', function (req, res) {
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(model_json));
})

app.get('/group1-shard1of1.bin', function (req, res) {
	res.writeHead(200, {
	'Content-Type': "application/octet-stream",
	'Content-Length': model_bin.length
    });
    res.end(Buffer.from(model_bin, 'binary'));
})

// start the server in the port 5000
app.listen(5000, function () {
    console.log('listening on port 5000.');
});
