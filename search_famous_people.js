const settings = require('./settings.json');
const knex = require('knex')({
  client: 'pg',
  connection: {
    user:       settings.user,
    password:   settings.password,
    database:   settings.database,
    host:       settings.hostname,
    port:       settings.port,
    ssl:        settings.ssl
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