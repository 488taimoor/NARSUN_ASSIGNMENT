const UserAccessToken = require('./models/UserAccessTokens')


exports.isAuthorized = function (req, res, next) {
    var t = req.get('Authorization');
  console.log('before',t);

  var t1 = JSON.parse(t);
  console.log('after jason',t1);
  UserAccessToken.findOne({token:t1.token, userAccount:t1.userId}).exec((err, result)=>{
      if (err){
        console.log('user not exist', err)
        res.status(500).json({ 'status': 'failure', 'err': 'your session has been expired please make login again!'});
      }else if(result!=null|| result!=undefined){
        console.log('user exist', result)
        return next()
      }
  })
}