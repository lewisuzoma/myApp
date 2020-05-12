const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ users: [], users: {} })
  .write()
 
// Add a post
db.get('users')
  .push({ id: 1, email: 'lowdb is awesome'})
  .write()
 
// Set a user using Lodash shorthand syntax
db.set('users.fullname', 'typicode')
  .write()