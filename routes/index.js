var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.get('/team/:id', function(req, res, next) {
  res.render('team-detail', { title: 'Team Detail' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Log In' });
});

router.get('/logout', function(req, res, next) {
  res.render('logout', { title: 'Log Out' });
});
module.exports = router;
