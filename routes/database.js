const mongoose=require('mongoose');
mongoose.Promise=global.Promise;

mongoose.connect('mongodb://localhost:27017/record',(err,out)=>{
  if(err)
  {
    console.log('error occurs'+err);
  }
  else{
    console.log('connected ');
  }
});
/* GET home page. */
var schema=mongoose.Schema ;
var myschema=new schema({
  name : String,
  nationality: String
});
var model= mongoose.model('my_model',myschema);

module.exports=model;
