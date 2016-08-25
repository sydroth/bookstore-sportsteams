const express = require('express')
const router = express.Router()
const _ = require( 'lodash' )
const pgp = require( 'pg-promise' )()
const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )
const indexToRange = (li) => {
  if (li === '1'){
    return [0,7]
  }
  if (li === '2' ){
  return [8,13]
  }
  if (li === '3'){
    return [14, 19]
  } 
}

// Read endpoint
router.get( '/:id', (request, response, next) => {
  // Find that league in our Database
  let leagueIndex = request.params.id
  let range = indexToRange(leagueIndex)
  let querystr = (`SELECT * FROM teams WHERE division_id BETWEEN '${range[0]}' AND '${range[1]}'`)
  let leagueData = db.any( querystr ).then( data => {
    response.send( `You are here: /leagues/${request.params.id} and leagueIndex = ${data}` )
  }).catch( error => {
    console.log( error )
    response.send( error )
  })
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