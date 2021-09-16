const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const dbPath = path.join(__dirname,"../tasks.db")

const initDB = () =>  new sqlite3.Database(dbPath)

module.exports = initDB 
