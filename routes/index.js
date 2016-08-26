const express = require('express');
const router = express.Router();
const _ = require( 'lodash' )

const pgp = require( 'pg-promise' )()
const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )


/* GET home page. */
router.get('/', function(req, res, next) {
  db.any(`SELECT * FROM teams`).then
  res.render('home-page', { title: 'Team Geek' });
});

router.get('/league/:id', function(req, res, next) {
  res.render('nfl-detail', { title: 'NFL' });
});

router.get('/division/:id', function(req, res, next) {
  res.render('division-detail', { title: 'Divisions' });
});

router.post('/search', function(req, res, next) {
  res.render('search-results', { title: 'Search Results' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Log Out' });
});
module.exports = router;
