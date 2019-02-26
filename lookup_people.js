
// Require database 
// const { Client } = require('pg')
// const client = new Client()

// Require 'node-postgres'
const pg = require('pg');
const settings = require('./settings.json')
// Grab command line argument
const person = process.argv[2];

// Get user settings
const client = new pg.Client(settings);

// client.connect()


// create empty variable to store data - 'personResults' 
// let personResults = [];

// function findPersion(person, data) {
//   const query = "SELECT * FROM famous_people WHERE first_name='${person}' OR last_name='${person}'"
  
//   console.log(query);
// }
// findPersion();




client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name='${person}' OR last_name='${person}'`, (err, res) => {
    if (err) {
      return console.error("Error running on query", err);
    }
    
    // console.log(res.rows[0]);
    first_name = res.rows[0].first_name;
    last_name = res.rows[0].last_name;
    birthdate = res.rows[0].birthdate;
    
    console.log(`${first_name} ${last_name}, born '${birthdate}'`);

    // console.log()
    client.end();
  });
});







// Iterate through table rows
// Get 'first_name' column in 'famous_people' table
// compare 'person' to 'first_name' column
    // if 'person' matches to 'first_name' 
      // add 'first_name' to 'personResults'
      // continue compare/loop 
    // if 'person does not match to 'first_name'
      // continue compare/loop 
// Return stored data  - 'personResults'
  // create ordered list to display results
    // each element in 'personResults' displayed in list item
      // 'first_name'
      // 'date_of_birth'
  // return constructed elements





