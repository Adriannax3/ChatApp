const mongoose = require("mongoose");
const config = require("../config");

function connectDB() {
    mongoose.connect(
        `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster.09xfzdn.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`, {
            tls: true // Ensure TLS/SSL is enabled
        }
    );

    mongoose.connection.once("open", () => {
        console.log("Connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });
}

module.exports = {
    connectDB, 
    connection: mongoose.connection
};