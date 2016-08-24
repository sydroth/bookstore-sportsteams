var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home-page', { title: 'Team Geek' });
});

router.get('/nfl', function(req, res, next) {
  res.render('nfl-detail', { title: 'NFL' });
});

router.get('/nba', function(req, res, next) {
  res.render('nba-detail', { title: 'NBA' });
});

router.get('/mlb', function(req, res, next) {
  res.render('mlb-detail', { title: 'MLB' });
});

router.get('/division/:division', function(req, res, next) {
  res.render('division-detail', { title: 'Divisions' });
});

router.get('/search', function(req, res, next) {
  res.render('search-results', { title: 'Search Results' });
});

router.get('/team/:team', function(req, res, next) {
  res.render('team-detail', { title: 'Team Detail' });
});

router.get('/additions/:user', function(req, res, next) {
  res.render('my-additions', { title: 'My Additions' });
});

router.get('/add', function(req, res, next) {
  res.render('add-team', { title: 'Add Team' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Log Out' });
});
module.exports = router;
