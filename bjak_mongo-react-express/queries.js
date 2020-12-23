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

//Note how this template does not need to have every field in companiesSchema.js
const companyDetailsTemplate = {
  name: "",
  founded_year: ""
}

// CRUD operations
// Create new student entry using a GET request
router.get('/save-with-GET/:name', function(req, res) {
  const inputName = req.params.name;
  console.log(`Input name received: ${inputName}`);
  
  let companyDetails = {...companyDetailsTemplate};
  companyDetails["name"] = inputName;
  
  const newCompany = new CompaniesModel(companyDetails);

  //Schema.save() works like db.collectionName.insert() in Mongo shell
  newCompany.save(function(err, data) {
    if(err) {
      console.log(error);
    }
    else {
      res.send(`The name ${inputName} was submitted using GET request and sent to MongoDB`);
    }
  });
});
//Creating a new student entry, but using POST
router.post('/save-with-POST/:name', function(req, res) {
  const inputName = req.params.name;
  console.log(`Input name received: ${inputName}`);
  
  let companyDetails = {...companyDetailsTemplate};
  companyDetails["name"] = inputName;
  
  const newCompany = new CompaniesModel(companyDetails)

  //Schema.save() works like db.collectionName.insert() in Mongo shell
  newCompany.save(function(err, data) {
    if(err) {
      console.log(error);
    }
    else {
      res.send(`The name ${inputName} was submitted using POST request and sent to MongoDB`);
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
router.get('/findTwentyWithSort/:sortOrder', function(req, res) {
  const sortOrder = req.params.sortOrder;
  const sortCriteria = { name: 1 };

  if(sortOrder == "ASCENDING"){
    sortCriteria["name"] = 1
  } else if (sortOrder == "DESCENDING"){
    sortCriteria["name"] = -1
  }

  console.log(`Sort order to use: ${sortOrder}`)
  const findReq = async() => { 
    await CompaniesModel
      .find({})
      .limit(20)
      .sort(sortCriteria)
      .exec(function(err, data) {
        if(err){
          console.log(err);
        }
        else{
          //console.log(data)
          res.send(data);
        }
    });  
  }
  findReq();

});
// Retrieve/read one db entry with given "name" using findOne()
router.get('/findFirst/:name', function(req, res) {
  const companyName = req.params.name;
  console.log(`Request sent to find company of name ${companyName}`);

  CompaniesModel
    //Use of projection syntax here ensures only desired results returned from Document
    .findOne({ name: companyName },{"name": 1, "_id": 1, "founded_year": 1})
    .exec(function(err, data) {
        if(err){
          console.log(err);
        }
        else{
          if(data == null){
            res.send(JSON.stringify(`Company of name "${companyName}" not found`));
          } else {
            res.send(data);
          }
        }
      });  
});
//Update by "year" && "_id" attribute
//Best practice to find by _id, since it is unique unlike all other attributes
router.post('/updateYear/:year/:_id', function(req, res) {
  const founded_year = req.params.year;
  const _id = req.params._id;
  console.log(`Request made to update year of Document with _id ${_id}`);

  //Parameters in order of appearance: 
  //Conditions to identify target, update field+value, options, callback function
  CompaniesModel.findOneAndUpdate(
    {_id: _id}, {founded_year: founded_year}, {useFindAndModify: false}, function(err, data){
      if(err){
        console.log(err);
      }
      else{
        res.send(`Data updated for document with _id ${_id}`);
      }
  });  
});
//Delete entry based on given "_id" attribute
//Best practice to find by _id, since it is unique unlike all other attributes
router.get('/deleteCompany/:_id', function(req, res) {
  const _id = req.params._id;
  console.log(`Request made to delete one Document of _id ${_id}`);

  CompaniesModel.deleteOne({_id: _id}, function(err, data){
      if(err){
          console.log(err);
      }
      else{
          res.send(`Company data deleted for _id ${_id}`);
      }
  });  
});

//Using express.Router() removes the need to export each individual endpoint
module.exports = router;
