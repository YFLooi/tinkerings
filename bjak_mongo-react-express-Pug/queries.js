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

const companyDetailsTemplate = {
  name: "", permalink: "abc", crunchbase_url: "abc", homepage_url: "abc",
  blog_url: "abc", blog_feed_url: "abc", twitter_username: "abc",
  category_code: "abc", number_of_employees: 1234, founded_year: 1234,
  founded_month: 1234,
  founded_day: 1234,
  deadpooled_year:1234,
  tag_list: "abc",
  alias_list: "abc",
  email_address: "abc",
  phone_number: "abc",
  description: "abc",
  created_at: "2020-12-01T06:51:27.000Z",
  updated_at: "abc",
  _: "abc",
  image: "abc",
  products: [],
  relationships: [],
  competitons: [],
  providerships: [],
  total_money_raised: [],
  funding_rounds: [],
  investments: [],
  acquisition: {},
  acquisitions: [],
  offices: [],
  milestones: [],
  video_embeds: [],
  screenshots: [],
  external_links: [],
  partners: []
};

// CRUD operations
// Create new student entry using a GET request
router.get('/save-with-GET/:name', function(req, res) {
  // const newStudent = new CompaniesModel({StudentId:101, 
  //     Name:"Sam", Roll:1, Birthday:2001-09-08});
  const inputName = req.params.name;
  console.log(`Input name received: ${inputName}`);
  
  let companyDetails = companyDetailsTemplate;
  companyDetails["name"] = inputName;
  
  const newCompany = new CompaniesModel({companyDetails})

  //Schema.save() works like db.collectionName.insert() in Mongo shell
  newCompany.save(function(err, data) {
    if(err) {
        console.log(error);
    }
    else {
        res.send("Data inserted");
    }
  });
  res.send(`The name ${inputName} was submitted using GET request and sent to MongoDB`);
});
//Creating a new student entry, but using POST
router.post('/save-with-POST/:name', function(req, res) {
  const inputName = req.params.name;
  console.log(`Input name received: ${inputName}`);
  
  let companyDetails = companyDetailsTemplate;
  companyDetails["name"] = inputName;
  
  const newCompany = new CompaniesModel({companyDetails})

  //Schema.save() works like db.collectionName.insert() in Mongo shell
  newCompany.save(function(err, data) {
    if(err) {
        console.log(error);
    }
    else {
        res.send("Data inserted");
    }
  });

  res.send(`The name ${inputName} was submitted using POST request and sent to MongoDB`);
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

  CompaniesModel
    //Use of projection syntax here ensures only desired results returned from Document
    .findOne({ name: companyName },{"name": 1, "_id": 1, "founded_year": 1})
    .exec(function(err, data) {
        if(err){
          console.log(err);
        }
        else{
          res.send(data);
        }
      });  
});
//Update by "year" && "_id" attribute
//Best practice to find by _id, since it is unique unlike all other attributes
router.post('/updateYear/:year/:_id', function(req, res) {
  const _id = req.params._id;
  const founded_year = req.params.year;

  CompaniesModel.findByIdAndUpdate(
    _id, {founded_year: founded_year}, function(err, data){
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
          console.log("Data updated!");
      }
  });  
});
//Delete entry based on given "_id" attribute
//Best practice to find by _id, since it is unique unlike all other attributes
router.get('/deleteGiven/:_id', function(req, res) {
  const _id = req.params._id;
  
  CompaniesModel.remove({_id: _id}, function(err, data){
      if(err){
          console.log(err);
      }
      else{
          res.send(data);
      }
  });  
});

//Using express.Router() removes the need to export each individual endpoint
module.exports = router;
