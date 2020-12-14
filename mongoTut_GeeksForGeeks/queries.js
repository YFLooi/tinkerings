const mongoose = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const StudentModel = require('./studentschema'); 
require('dotenv').config(); //Allows retriving variables from the .env file

// Connecting to database 
const query = process.env.MONGO_URL;

const db = (query); 
mongoose.Promise = global.Promise; 

mongoose.connect(db, { useNewUrlParser : true, 
useUnifiedTopology: true }, function(error) { 
	if (error) { 
		console.log("Error!" + error); 
	} 
}); 


// CRUD operations
// Create new student entry using a GET request
router.get('/get_save', function(req, res) {
  var newStudent = new StudentModel({StudentId:101, 
      Name:"Sam", Roll:1, Birthday:2001-09-08});

  newStudent.save(function(err, data) {
      if(err) {
          console.log(error);
      }
      else {
          res.send("Data inserted");
      }
  });
});
//Creating a new student entry, but using POST
router.post('/post_save', function(req, res) {
  var newStudent    = new StudentModel();
     newStudent.StudentId = req.body.StudentId;
     newStudent.Name = req.body.Name;
     newStudent.Roll = req.body.Roll;
     newStudent.Birthday = req.body.Birthday;
     
     newStudent.save(function(err, data){
         if(err){
             console.log(error);
         }
         else{
             res.send("Data inserted");
         }
     });
});

// Retrieve/read 20 db entries
// Notice how the same find() command used in Mongo shell is used here
router.get('/findall', function(req, res) {
  StudentModel
    .find({})
    .limit(20)
    .exec(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});
// Retrieve/read 20 db entries, then sort in ascending order by AdmissionDate
// Notice how the same find() command used in Mongo shell is used here
router.get('/findall', function(req, res) {
  StudentModel
    .find({})
    .sort({AdmissionDate: 1})
    .limit(20)
    .exec(function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});
// Retrieve/read one db entry using findOne()
router.get('/findfirst', function(req, res) {
  StudentModel.findOne({StudentId:{$gt:185}}, 
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});
//Update by _id
router.post('/update', function(req, res) {
  StudentModel.findByIdAndUpdate(req.body.id, 
  {Name:req.body.Name}, function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
          console.log("Data updated!");
      }
  });  
});
//Delete entry based on given condition
router.get('/delete', function(req, res) {
  StudentModel.remove({StudentId:188}, 
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});
//Delete entry using _id as guide
router.post('/delete', function(req, res) {
  StudentModel.findByIdAndDelete((req.body.id), 
  function(err, data) {
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
          console.log("Data Deleted!");
      }
  });  
});



//Using express.Router() removes the need to export each individual endpoint
module.exports = router;
