const express = require("express");
const app = express();
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('connected', function() {
  console.log('Mongoose 连接到 example数据库');
}) 
connection.once('open', function(callback){
    console.log('数据库启动了');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require("./routers/records"));

app.listen(process.env.PORT, () => {
  console.log("listen on port " + process.env.PORT);
});
