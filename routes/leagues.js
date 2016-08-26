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
const insertLeagueSql = (name, abbreviation) =>
  `INSERT INTO leagues( name, abbreviation ) VALUES ( '${name}', '${abbreviation}' )`

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
    const league = leagues.find( league => league.id === leagueId )

    response.render( 'league_detail', { leagues, teams, league })
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

// View the edit a league page
router.get( '/edit/:id', (request, response, next) => {
  // Display the edit/create form
  const leagueId = parseInt( request.params.id )
  db.tx( transaction => {
    return transaction.batch([
      transaction.any( allLeagues() ),
      transaction.any( leaguebyID( leagueId ) )
    ])
  })
  .then( data => {
    const [ leagues, league ] = data
    const abbreviation = leagues.find( league => league.id === leagueId ).abbreviation
    response.render( 'add_league', { leagues, league, abbreviation })
  })
  .catch( error => {
    response.send( error.message || error )
  })
})

// Create a league
router.post( '/', (request, response, next) => {
  db.none( insertLeagueSql( request.body.name, request.body.abbreviation ) )
    .then( result => response.redirect( '/leagues' ))
    .catch( error => response.send({ error, message: error.message }))
})

// Update a league
router.post( '/update/:id', (request, response, next) => {
  const updatedValues = Object.keys( request.body ).map( key => `${key}='${request.body[ key ]}'`).join( ', ' )
  const sql = `UPDATE leagues SET ${updatedValues} WHERE id=${request.params.id}`

  db.any( sql ).then( result => response.redirect( `/leagues/id/${request.params.id}` ) )
    .then( error => response.send( { error, message: error.message } ))
})

// Delete a league
router.delete( '/delete/:id', (request, response, next) => {
  // Issue delete request to database
  // Redirect to the home page

  response.send( `You are here: DELETE /leagues/${request.params.id}` )
})

module.exports = router
