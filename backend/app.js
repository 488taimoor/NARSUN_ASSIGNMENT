// app.js
const cors = require('cors');
const express = require("express");
var path = require('path')
const bodyParser = require("body-parser");
var config = require("./config/db");
const LoginController = require("./controllers/LoginController");
const DeviceController = require("./controllers/DeviceController")
const UsersController = require("./controllers/UsersController")
var auth = require('./auth');
var multer = require('multer')

const app = express();
const port = process.env.PORT || 3301;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for image upload
app.set('views', __dirname + '/views');
var storage = multer.diskStorage({
  destination: './public/img',
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage });
app.use(express.static(__dirname + '/public/img'));
app.use(upload.single('photo'));

//All routes declaration is here

//user Routes
app
  .route("/api/Accounts/AuthUser", )
  .post(LoginController.handleUserAuth)
  app
  .route("/api/Accounts/AuthPass", )
  .post(LoginController.handlePassAuth)



//Devices api routes
  app
  .route("/uploadFile")
  .post(DeviceController.uploadFile);

  app
  .route("/api/addDevice")
  .post(auth.isAuthorized,DeviceController.addDevice);

  app
  .route("/api/getDeviceList")
  .post(auth.isAuthorized,DeviceController.getDeviceList);

  app
  .route("/api/UpdateDevice")
  .post(auth.isAuthorized,DeviceController.UpdateDevice);

  app
  .route("/api/DeleteDevice")
  .post(auth.isAuthorized,DeviceController.DeleteDevice);


  //AddUsers
  app
  .route("/api/AddUser")
  .post(auth.isAuthorized,UsersController.AddUser);

  app
  .route("/api/getAllUsers")
  .post(auth.isAuthorized,UsersController.getAllUsers);

  app
  .route("/api/UpdateUser")
  .post(auth.isAuthorized,UsersController.UpdateUser);

  app
  .route("/api/DeleteUser")
  .post(auth.isAuthorized,UsersController.DeleteUser);

//port listener rout
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
