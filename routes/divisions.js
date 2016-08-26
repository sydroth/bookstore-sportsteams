const express = require('express')
const router = express.Router()
const _ = require( 'lodash' )

const pgp = require( 'pg-promise' )()
const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )

const allLeagues = () => `SELECT * FROM leagues`
const teamsByDiv = divId => 
  `SELECT d.*, d.name as division_name, d.id as division_id, l.id as league_id, l.abbreviation, l.name as league_name 
   FROM teams t
   JOIN divisions d ON d.id=t.division_id 
   JOIN leagues l ON l.id=d.league_id 
   WHERE league_id=${divId}`
const leaguebyID = (id)=>`SELECT * FROM leagues WHERE id=${id}`
const teamsFromDiv = value =>
`SELECT * FROM teams WHERE division_id=${divId}`
// Read endpoint
router.get( '/id/:id', (request, response, next) => {
  const divId = parseInt( request.params.id )

  db.tx( transaction => {
    return transaction.batch([
      transaction.any( allLeagues() ),
      transaction.any( teamsByDiv( divId ) ),
      transaction.any( teamsFromDiv(divId))
    ])
  })
  .then( data => {
    const [ leagues, divisions, divTeams ] = data
    const abbreviation = leagues.find( league => league.id === divId ).abbreviation
    console.log(divisions)
    response.render( 'division_detail', { leagues, divisions, divTeams, abbreviation })
  })
  .catch( error => {
    response.send( error.message || error )
  })
})

// View the add a league page
router.get( '/create', (request, response, next) => {
  // Display the edit/create form
  // Just a straight response.render, but with some data to populate dropdowns

  response.send( 'You are here: /divisions/create' )
})

// View the edit a league page
router.get( '/edit/:id', (request, response, next) => {
  // Display the edit/create form
  // Go get the data for this league from the database
  // Just a straight response.render, but with some data to populate dropdowns and all fields

  response.send( `You are here: /divisions/edit/${request.params.id}` )
})

// Create a league
router.post( '/', (request, response, next) => {
  // Validation of data supplied from user
  // Insert the data from the form into the database

  response.send( 'You are here: POST /divisions' )
})

// Update a league
router.put( '/:id', (request, response, next) => {
  // Issue update request to Database
  // Redirect to league page

  response.send( `You are here: PUT /divisions/${request.params.id}` )
})

// Delete a league
router.delete( '/:id', (request, response, next) => {
  // Issue delete request to database
  // Redirect to the home page

  response.send( `You are here: DELETE /divisions/${request.params.id}` )
})

module.exports = router