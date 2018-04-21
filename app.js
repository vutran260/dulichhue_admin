var express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


// Port Number
const port = process.env.PORT || 8080;

// CORS MiddleWare
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser MiddleWare
app.use(bodyParser.json());

// Index Route
app.get('/', (req, res) =>{
	res.send('Invalid Enpoint');
})

// Index Page
app.get('*', function(req, res) {
  res.sendfile(path.join(__dirname, 'public/index.html'));
})

//Start Server
app.listen(port, () => {
	console.log('Server started on port ' + port);
})