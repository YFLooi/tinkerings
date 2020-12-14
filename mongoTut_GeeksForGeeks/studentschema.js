// Source: https://www.geeksforgeeks.org/nodejs-crud-operations-using-mongoose-and-mongodb-atlas/
// Schema is a representation of the structure of the data. 
// It allows us to decide exactly what data we want, 
// and what options we want the data to have as an object.
var mongoose=require('mongoose'); 
  
var StudentSchema = new mongoose.Schema({ 
    StudentId:Number, 
    Name:String, 
    Roll:Number, 
    Birthday:Date, 
    Address:String 
}); 

// Mongoose models basically provide a list of predefined methods that are 
// used to manipulate the data for inserting, updating, deleting and retrieving 
// from the database collection.
//Parameters provided: Model name, model schema, name of target mongodb collection
module.exports = mongoose.model( 
    'student', StudentSchema, 'Students'); 
