const knex = require('knex')({
  client: 'pg',
  connection: {
    host    : '127.0.0.1',
    user    : 'development',
    password  : 'development',
    database  : 'test_db'
  }
});

const moment = require('moment');
const person = process.argv[2];
const formatBirthdate = (birthdate) => moment(birthdate).format('YYYY-MM-DD');

knex.from('famous_people').select()
.where({ 'first_name': person }).orWhere({ 'last_name': person })
.then((rows) => {
  console.log(rows);
  rows.forEach(function(person) {
    console.log(`${person.id}. ${person.first_name} ${person.last_name}, born '${formatBirthdate(person.birthdate)}'`);
  })
  knex.destroy();
})
.catch((err) => { console.log(err); throw err});