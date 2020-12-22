// Source: https://www.geeksforgeeks.org/nodejs-crud-operations-using-mongoose-and-mongodb-atlas/
// Schema is a representation of the structure of the data. 
// It allows us to decide exactly what data we want, 
// and what options we want the data to have as an object.
const mongoose= require('mongoose'); 
  
//_id created by default. No need to include here.
const CompaniesSchema = new mongoose.Schema({ 
  acquisition: Object,
  acquisitions: Array,
  alias_list: String,
  blog_url: String,
  blog_feed_url: String,
  category_code: String,
  crunchbase_url: String,
  deadpooled_year: Number,
  homepage_url: String,
  founded_year: Number,
  founded_month: Number,
  founded_day: Number,
  name: String,
  number_of_employees: Number,
  permalink: String,
  tag_list: String,
  twitter_username: String,
  email_address: String,
  phone_number: String,
  description: String,
  created_at: Date,
  updated_at: String,
  image: Object,
  products: Array,
  relationships: Array,
  competitons: Array,
  providerships: Array,
  total_money_raised: String,
  funding_rounds: Array,
  investments: Array,
 
  offices: Array,
  milestones: Array,
  video_embeds: Array,
  screenshots: Array,
  external_links: Array,
  partners: Array
}); 

// Mongoose models basically provide a list of predefined methods that are 
// used to manipulate the data for inserting, updating, deleting and retrieving 
// from the database collection.
// Parameters provided: Model name, model schema, name of target mongodb collection
// The 1st and 3rd parameter MUST be an exact match with the Collection's name in Atlas
module.exports = mongoose.model( 
    'companies', CompaniesSchema, 'companies'); 
