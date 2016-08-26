const express = require('express')
const router = express.Router()
const _ = require( 'lodash' )

const pgp = require( 'pg-promise' )()
const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )

const allTeams = () => `SELECT * FROM teams`
const teamsByName = teamId => 
  `SELECT t.*, d.name as division_name, d.id as division_id, l.id as league_id, l.abbreviation, l.name as league_name 
   FROM teams t
   JOIN divisions d ON d.id=t.division_id 
   JOIN leagues l ON l.id=d.league_id`
const insertTeamSql = (name) =>
  `INSERT INTO teams( name ) VALUES ( '${name}' )`
// Read endpoint
router.get( '/id/:id', (request, response, next) => {
  const teamId = parseInt( request.params.id )

  db.tx( transaction => {
    return transaction.batch([
      transaction.any( allTeams( ) ),
      transaction.any( teamsByName( teamId) ),
    ])
  })
  .then( data => {
    const [ teams, team ] = data

    response.render( 'team_detail', { teams, team })
  })
  .catch( error => {
    response.send( error.message || error )
  })

})

// View the add a team page
router.get( '/create', (request, response, next) => {
  db.any(allTeams())
  .then(data =>{
    response.render( 'add_team', { teams: data } )
  })
  .catch (error => {
    response.send( error.message || error )
  })

})

// View the edit a team page
router.get( '/edit/:id', (request, response, next) => {
  // Display the edit/create form
  const teamId = parseInt( request.params.id )
  db.tx( transaction => {
    return transaction.batch([
      transaction.any( allTeams() )
    ])
  })
  .then( data => {
    const [ teams, team ] = data
    response.render( 'add-team', { teams, team })
  })
  .catch( error => {
    response.send( error.message || error )
  })

})

// Create a team
router.post( '/', (request, response, next) => {
  db.none( insertTeamSql( request.body.name ) )
    .then( result => response.redirect( '/teams' ))
    .catch( error => response.send({ error, message: error.message }))
})

// Update a team
router.post( '/update/:id', (request, response, next) => {
  const updatedValues = Object.keys( request.body ).map( key => `${key}='${request.body[ key ]}'`).join( ', ' )
  const sql = `UPDATE teams SET ${updatedValues} WHERE id=${request.params.id}`

  db.any( sql ).then( result => response.redirect( `/teams/id/${request.params.id}` ) )
    .then( error => response.send( { error, message: error.message } ))
})

// Delete a team
router.delete( '/delete/:id', (request, response, next) => {
  // Issue delete request to database
  // Redirect to the home page

  response.send( `You are here: DELETE /teams/${request.params.id}` )
})

module.exports = router