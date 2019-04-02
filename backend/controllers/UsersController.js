const Users = require("../models/Users");
const Devices = require("../models/Devices");

//Add New User
exports.AddUser = (req, res) => {

  console.log("users Data :", req.body)
  console.log("Data :", req.body)
  Users.find({ firstName: req.body.firstName, lastName: req.body.lastName }).exec((err, result) => {
    console.log('find user :', result)
    if (err) {
      res.status(500).send({ 'status': 'failure', 'err': 'please try again' });
    } else if (result.length != 0) {
      res.status(500).send({ 'status': 'failure', 'err': 'Use another name. its already used!' });
    }
    else {
      var newUser = new Users(req.body)
      newUser.save((err, result) => {
        if (err) {
          res.status(500).send({ 'status': 'failure', 'err': 'please try again' });
        } else if (result != null || result != undefined) {
          console.log('User saved', result)
          res.status(200).send({ 'status': 'success', 'data': result });
        }
      })

    }
  })




}

//Get all Users
exports.getAllUsers = (req, res) => {


  Users.find().populate({ path: 'deviceId' }).exec((err, result) => {
    console.log('find Users :', result)
    if (err) {
      res.status(500).send({ 'status': 'failure', 'err': 'please try again' });
    }
    else {
      Devices.find().exec((err, devices) => {
        console.log('all devices', devices)
        if (err) {
          res.status(500).send({ 'status': 'failure', 'err': 'please try again' });
        } else {
          res.status(200).send({ 'status': 'success', 'Users': result, 'Devices': devices });
        }
      })

    }
  })


}

//Update User
exports.UpdateUser = (req, res) => {

  console.log('here is data', req.body)

  Users.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }).populate('deviceId').exec((err, result) => {
      console.log('updated User :', result)
      if (err) {
        res.status(500).send({ 'status': 'failure', 'err': 'please try again' });
      }
      else {
        res.status(200).send({ 'status': 'success', 'data': result });
      }
    })


}

//Delete User
exports.DeleteUser = (req, res) => {

  console.log('here is data', req.body)

  Users.findOneAndRemove({ _id: req.body.userId }).exec((err, result) => {
    console.log('Deleted User :', result)
    if (err) {
      res.status(500).send({ 'status': 'failure', 'err': 'please try again' });
    }
    else {
      res.status(200).send({ 'status': 'success', 'data': result });
    }
  })


}