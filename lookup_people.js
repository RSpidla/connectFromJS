const pg = require('pg');
const moment = require('moment');
const settings = require('./settings.json');
const person = process.argv[2];
const client = new pg.Client(settings);

const formatBirthdate = (birthdate) => moment(birthdate).format('YYYY-MM-DD');

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name='${person}' OR last_name='${person}'`, (err, res) => {
    if (err) {
      return console.error("Error running on query", err);
    }
    res.rows.forEach(function(person, i) {
      console.log(`${i + 1}. ${person.first_name} ${person.last_name}, born '${formatBirthdate(person.birthdate)}'`);
    });
    client.end();
  });
});