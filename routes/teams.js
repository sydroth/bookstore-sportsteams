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
const leaguebyID = (id)=>`SELECT * FROM leagues WHERE id=${id}`


// Read endpoint
router.get( '/id/:id', (request, response, next) => {
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

    response.render( 'league_detail', { leagues, teams, abbreviation })
  })
  .catch( error => {
    response.send( error.message || error )
  })
})

// View the add a league page
router.get( '/create', (request, response, next) => {
    db.any(allLeagues())
    .then(data =>{
      response.render( 'add_league', { leagues: data } )
    })
    .catch (error => {
      response.send( error.message || error )
    })
  })


// View the add a team page
router.get( '/create', (request, response, next) => {
  db.any(allLeagues())
  .then(data =>{
    response.render( 'add_team', { team: data } )
  })
  .catch (error => {
    response.send( error.message || error )
  })

})

// View the edit a team page
router.get( '/edit/:id', (request, response, next) => {
  // Display the edit/create form
  // Go get the data for this team from the database
  // Just a straight response.render, but with some data to populate dropdowns and all fields

  response.send( `You are here: /teams/edit/${request.params.id}` )
})

// Create a team
router.post( '/', (request, response, next) => {
  // Validation of data supplied from user
  // Insert the data from the form into the database

  response.send( 'You are here: POST /teams' )
})

// Update a team
router.put( '/:id', (request, response, next) => {
  // Issue update request to Database
  // Redirect to team page

  response.send( `You are here: PUT /teams/${request.params.id}` )
})

// Delete a team
router.delete( '/:id', (request, response, next) => {
  // Issue delete request to database
  // Redirect to the home page

  response.send( `You are here: DELETE /teams/${request.params.id}` )
})

module.exports = router