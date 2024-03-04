// Importing the Express framework
let express = require('express');
// Loading environment variables from a .env file
require('dotenv').config();
// Body parser middleware for parsing incoming request bodies
let bodyParser = require('body-parser')
// Creating an instance of Express
let app = express();

// Defining the absolute path to the index.html file
absolutePath = __dirname + '/views/index.html'

// Middleware function to log request details
app.use(function middleware(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
});

// Middleware to parse urlencoded and json request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Getting current time and passing it to the next middleware
currentTime = new Date().toString()
app.get("/now", function(req,res,next) {
    req.time = currentTime;
    next();
}, function(req, res) {
    res.send({time: req.time});
})

// Serving the index.html file at the root endpoint
app.get("/", (req, res) => {
    res.sendFile(absolutePath);
});

// Endpoint to echo a word provided in the URL parameter
app.get("/:word/echo", (req, res) => {
    const {word} = req.params;
    res.json({echo: word})
})

// Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
    // Destructuring and renaming keys for query parameters
    var { first: firstName, last: lastName} = req.query;
    res.json({name: `${firstName} ${lastName}`})
})

// Endpoint to handle POST request for name
app.post("/name", (req, res) => {
    // Concatenating first and last name from request body
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
})

// Serving static files from the public directory
app.use('/public', express.static(__dirname + '/public'))

// Endpoint to return a JSON response
app.get('/json', (req, res) => {
    var message= 'Hello json'
    // Checking if environment variable MESSAGE_STYLE is set to "uppercase"
    if(process.env.MESSAGE_STYLE === "uppercase"){
        message = 'Hello json'.toUpperCase()
    }
    // Sending JSON response with message
    res.json({"message": message})
})

// Exporting the Express app
module.exports = app;
