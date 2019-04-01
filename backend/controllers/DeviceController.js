const Device = require("../models/Devices");

exports.uploadFile = (req,res) => {

    console.log(req.file, req.body) // form files
if(req.file)
    res.status(200).send({'status': 'uploaded', 'imageData': req.file});
else
  res.status(300).send({'status': "empty"})
  //  res.status(200).json('addStatus','created');
}


exports.addDevice = (req, res) => {

    console.log("Data :", req.body)
    Device.find({deviceName:req.body.deviceName}).exec((err, result)=>{
      console.log('find device :', result)
      if(err){
        res.status(500).send({'status': 'failure', 'err': 'please try again'});
      }else if(result.length!=0){
        res.status(500).send({'status': 'failure', 'err': 'Use another device name. its already used!'});
      }else{
      var  newDevice = new Device(req.body)
        newDevice.save((err, result)=>{
          if(err){
            res.status(500).send({'status': 'failure', 'err': 'please try again'});
          }else if(result!=null || result!=undefined){
            console.log('device saved', result)
            res.status(200).send({'status': 'success', 'data':result});
          }
        })

      }
    })
  
  
  
  }


  exports.getDeviceList = (req, res) => {

    Device.find().exec((err, result)=>{
      console.log('find device :', result)
      if(err){
        res.status(500).send({'status': 'failure', 'err': 'please try again'});
      }else if(result.length!=0){
        res.status(200).send({'status': 'success', 'data':result});
      }else{
      
        res.status(500).send({'status': 'success', 'err': 'No record Found!', 'data':result});
      }
    })
  
  
  
  }

  
  exports.UpdateDevice = (req, res) => {

    Device.findOneAndUpdate(
      { _id: req.body.id },
      req.body,
      { new: true },
      (err, result)=>{
      console.log('find device :', result)
      if(err){
        res.status(500).send({'status': 'failure', 'err': 'please try again'});
      }else if(result.length!=0){
        res.status(200).send({'status': 'success', 'data':result});
      }else{
      
        res.status(500).send({'status': 'failure', 'err': 'No record Found!', 'data':result});
      }
    })
  
  
  
  }
  exports.DeleteDevice = (req, res) => {
    console.log('deleted id', req.body)

    Device.findByIdAndRemove({_id: req.body._id}).exec((err, result)=>{
      console.log('find device :', result)
      if(err){
        res.status(500).send({'status': 'failure', 'err': 'please try again'});
      }else if(result.length!=0){
        res.status(200).send({'status': 'success', 'data':result});
      }else{
      
        res.status(500).send({'status': 'failure', 'err': 'No record Found!', 'data':result});
      }
    })
  
  
  
  }