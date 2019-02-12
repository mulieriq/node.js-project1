const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");
const error = require('/root/LocalMountedDisk/Projects/Web/Node.JS/Node/classProject/controllers/404error.js');
const multer = require('multer');
const upload = multer({dest :'/public'});

const app = express();


app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use('/public',express.static("public"));
app.use(express.static(path.join(__dirname, "./", "views", "css")));
app.use(express.static(path.join(__dirname, "./", "views", "js")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "*");
    return res.status.json({});
  }
  next();
});
//routes

app.use(shopRoute);
app.use("/admin", adminRoute.routes);

//404 Error
app.use(error.error);
//server
app.listen(3000, () => {
  console.log("Server Running");
});