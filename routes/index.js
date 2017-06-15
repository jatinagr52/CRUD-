var express = require('express');
var router = express.Router();
var model=require('./database');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/add', function(req, res, next) {
  res.render('add');
});

router.post('/add',function(req, res, next){
  //console.log('ok');
  var mymodel = new model({
    name : req.body.usrname ,
    nationality:req.body.nation
  });
mymodel.save((err,out)=>{
if(err){
  console.log('error');
}else{
  console.log('saved'+out);
}
});
  res.redirect('/list');
});

router.get('/list',function(req,res,next){
//console.log('bkbfkcsc');
  model.find({},(err,out)=>{
    if(err){
      throw err ;
    }
    else{
      console.log(out.id);
    }

  res.render('list',{output:out});
  });
});

router.get('/delete/:id',function(req,res,next){
 //0var ID= new ObjectId(id);
    //console.log(ID);
   model.findByIdAndRemove({_id:req.params.id},(err,out)=>{
     if(err){
       console.log('cannot be deleted');

     }
     else{
      // out.remove();
       console.log('Deleted');
     }
     res.redirect('/list');
   });

});

router.get('/update/:id',function(req,res,next){
model.findById({_id:req.params.id},(err,out)=>{
  if(err){
    console.log('Document not exits');
  }
  else{
    console.log('ready to update');
  //  console.log(out);
        // res.render('update')

  }
  res.render('update',{result:out});
//  res.redirect('/list');
});

});

router.post('/update/:id',function(req,res,next){
console.log(req.params.id);
model.findById({_id:req.params.id}, function (err, out) {
  // Handle any possible database errors
  if (err) {
      res.status(500).send(err);
  } else {
      // Update each attribute with any possible attribute that may have been submitted in the body of the request
      // If that attribute isn't in the request body, default back to whatever it was before.
      out.name=req.body.usrname,
      out.nationality=req.body.nation
      // Save the updated document back to the database
      out.save(function (err, todo) {
          if (err) {
              res.status(500).send(err)
          }
          console.log(todo);
      });
  }
});
  res.redirect('/list');
});

module.exports = router;
