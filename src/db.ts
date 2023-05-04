const { Pool} = require('pg')

const pool = new Pool({
  user: 'michael',
  database: 'todo',
  password: 'starmane',
  port: 5432,
  host: 'localhost',
})
