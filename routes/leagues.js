const express = require('express')
const router = express.Router()
const _ = require( 'lodash' )

const pgp = require( 'pg-promise' )()
const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )

const allLeagues = () => `SELECT * FROM leagues`
const teamsByLeague = leagueId => 
  `SELECT t.*, d.name as division_name, d.id as division_id, l.id as league_id, l.abbreviation, l.name as league_name 
   FROM teams t
   JOIN divisions d ON d.id=t.division_id 
   JOIN leagues l ON l.id=d.league_id 
   WHERE league_id=${leagueId}`

// Read endpoint
router.get( '/:id', (request, response, next) => {
  // Find that league in our Database
  const leagueId = parseInt( request.params.id )

  db.tx( transaction => {
    return transaction.batch([
      transaction.any( allLeagues() ),
      transaction.any( teamsByLeague( leagueId ) )
    ])
  })
  .then( data => {
    const [ leagues, teams ] = data
    const abbreviation = leagues.find( league => league.id === leagueId ).abbreviation

    response.render( 'mlb-detail', { leagues, teams, abbreviation })
  })
  .catch( error => {
    response.send( error.message || error )
  })

  // db.any( teamsByLeague( leagueId ) ).then( data => {
  //   const leagueName = ( data || [] )[ 0 ].abbreviation || 'Not Found'

  //   response.render('mlb-detail', { data, leagueName })
  // }).catch( error => {
  //   response.send( error )
  // })
    // Get the :id from the request
  // Display the league detail page related to that league
    // Use the response object to send back a view with some data  
 
  // response.send( `You are here: /leagues/${request.params.id} and leagueIndex = ${leagueData}` )
})

// View the add a league page
router.get( '/create', (request, response, next) => {
  // Display the edit/create form
  // Just a straight response.render, but with some data to populate dropdowns

  response.send( 'You are here: /leagues/create' )
})

// View the edit a league page
router.get( '/edit/:id', (request, response, next) => {
  // Display the edit/create form
  // Go get the data for this league from the database
  // Just a straight response.render, but with some data to populate dropdowns and all fields

  response.send( `You are here: /leagues/edit/${request.params.id}` )
})

// Create a league
router.post( '/', (request, response, next) => {
  // Validation of data supplied from user
  // Insert the data from the form into the database

  response.send( 'You are here: POST /leagues' )
})

// Update a league
router.put( '/:id', (request, response, next) => {
  // Issue update request to Database
  // Redirect to league page

  response.send( `You are here: PUT /leagues/${request.params.id}` )
})

// Delete a league
router.delete( '/:id', (request, response, next) => {
  // Issue delete request to database
  // Redirect to the home page

  response.send( `You are here: DELETE /leagues/${request.params.id}` )
})

module.exports = router