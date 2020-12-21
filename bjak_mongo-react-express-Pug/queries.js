const mongoose = require('mongoose'); 
const express = require('express'); 
const router = express.Router(); 
const CompaniesModel = require('./companiesSchema'); 
require('dotenv').config(); //Allows retriving variables from the .env file

// Connecting to database 
const query = process.env.MONGO_URL;
const db = (query); 
mongoose.Promise = global.Promise; 

mongoose.connect(db, { useNewUrlParser : true, 
useUnifiedTopology: true }, function(error) { 
	if (error) { 
		console.log("Error!" + error); 
	} else {
    console.log("Connected to MongoDB Atlas database")
  }
}); 


// CRUD operations
// Create new student entry using a GET request
router.get('/save_with_GET', function(req, res) {
  var newStudent = new CompaniesModel({StudentId:101, 
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
router.post('/save_with_POST', function(req, res) {
  var newStudent = new CompaniesModel();
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
router.get('/findTwenty', function(req, res) {
  CompaniesModel
    .find({"founded_year": {"$gt":2000}})
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
router.get('/findAllWithSort', function(req, res) {
  CompaniesModel
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
  CompaniesModel.findOne({StudentId:{$gt:185}}, 
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
  CompaniesModel.findByIdAndUpdate(req.body.id, 
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
router.get('/deleteGiven', function(req, res) {
  CompaniesModel.remove({StudentId:188}, 
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
router.post('/deleteBy_id', function(req, res) {
  CompaniesModel.findByIdAndDelete((req.body.id), 
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
