const express = require('express')
const router = express.Router()

const pgp = require( 'pg-promise' )()
const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )

router.get( '/', (request, response) => {
  const query = request.query.q.toLowerCase()

  const sql = 
    `SELECT * FROM teams 
     WHERE LOWER(name) LIKE '%${query}%' 
     OR LOWER(head_coach) LIKE '%${query}%' 
     OR LOWER(city) LIKE '%${query}%'
     OR LOWER(mascot) LIKE '%${query}%'`

  db.any( sql ).then( result => response.send({ result }))
    .catch( error => response.send({ error, message: error.message } ))
})

module.exports = router