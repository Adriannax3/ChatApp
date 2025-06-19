const express = require("express");
const config = require("./config.js");
const app = express();
const cors = require('cors');
const server = require("http").Server(app);
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRoutes.js');
const socketIo = require('socket.io');
const chatSocket = require('./sockets/chat.js');

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));
app.use('/api/', apiRouter);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

chatSocket(io);

server.listen(config.PORT, function() {
    console.log("Server is working...");
});