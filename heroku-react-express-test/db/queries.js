require('dotenv').config(); // https://www.npmjs.com/package/dotenv
const pgp = require('pg-promise')(); // https://www.npmjs.com/package/pg-promise
const dbase = pgp(process.env.DATABASE); // Note: connect to database

//Selects all items in the 'newarrival' table
async function getNewArrivals (request, response) {
    console.log('Request for new arrivals received');
    const rowList = await dbase.query('SELECT * FROM newarrival ORDER BY id ASC');
    response.send(rowList);
}

/*'module.export' allows multiple functions to be exported at the same time! No need to declare
 one by one (ie export const deleteUser(){}).
 With ES6 syntax, its getUsers instead of getUsers:getUsers*/
module.exports = {
    getNewArrivals,
}

