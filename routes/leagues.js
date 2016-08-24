const express = require('express')
const router = express.Router()

// Read endpoint
router.get( '/:id', (request, response, next) => {
  // Find that team in our Database
    // Get the :id from the request
  // Display the team detail page related to that team
    // Use the response object to send back a view with some data

  response.send( `You are here: /teams/${request.params.id}` )
})

// View the add a team page
router.get( '/create', (request, response, next) => {
  // Display the edit/create form
  // Just a straight response.render, but with some data to populate dropdowns

  response.send( 'You are here: /teams/create' )
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