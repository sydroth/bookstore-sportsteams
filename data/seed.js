const _ = require( 'lodash' )
const pgp = require( 'pg-promise' )()
const basicCSV = require( 'basic-csv' )


const connection = { database: 'earsplitting-glider' }
const db = pgp( connection )

basicCSV.readCSV( 'data/team_data.csv', { dropHeader: true }, (error, rows) => {
  const leagues = _.uniq( rows.map( row => row[2] ))
  const league_values = leagues.map( league => `('${league}')` ).join( ', ' )
  const league_insert = `INSERT INTO leagues( abbreviation ) VALUES ${league_values}`

  db.none( league_insert ).then( data => pgp.end() )
    .catch( error => {
      console.log( error )
      pgp.end()
    })

  const divisions = _.uniqBy( rows.map( row => ({ name: row[3], league_id: leagues.indexOf( row[2] ) + 1 }) ), 'name' )
  const division_values = divisions.map( division => `( ${division.league_id}, '${division.name}')` ).join( ',' )
  const division_insert = `INSERT INTO divisions( league_id, name ) VALUES ${division_values}`

  db.none( division_insert ).then( data => pgp.end() )
    .catch( error => { 
      console.log( error )
      pgp.end()
    })

  // All the teams, with division index
  const team_objects = rows.map( row => {
    const division_id = _.findIndex( divisions, { name: row[ 3 ] })
    const coach = row[ 1 ]
    const mascot = row[ 4 ]
    const namePlusCity = row[ 0 ].split(' ')

    const name = namePlusCity.slice( namePlusCity.length - 1 )
    const city = namePlusCity.slice( 0, namePlusCity.length - 1 ).join( ' ' )

    return { division_id, name, city, coach, mascot }
  })

  const team_values = team_objects.map( team => 
    `( ${team.division_id}, '${team.name}', '${team.city}', '${team.coach}', '${team.mascot}' )`
  ).join( ', ' )

  const team_insert = `INSERT INTO teams( division_id, name, city, head_coach, mascot ) VALUES ${team_values}`

  db.none( team_insert ).then( data => pgp.end() )
    .catch( error => {
      console.log( error )
      pgp.end()
    })
})
