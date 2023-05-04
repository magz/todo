module.exports = {
  "development": {
    "username": process.env.PGUSER,
    "password": process.env.PGPASSWORD,
    "database": process.env.PGDATABASE,
    "host": process.env.PGHOST,
    "port": 5432,
    "dialect": "postgres"
  }
}