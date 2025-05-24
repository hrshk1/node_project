const express = require('express');
const app = express();
const db = require('./db');
const Menu = require('./models/Menu');
const { error } = require('console');
app.use(express.json()); //middleware


//import the router file:
const menuRoutes = require('./routes/menuroutes');
//use the routers
app.use('/menu',menuRoutes)
//similarly you can make many such routes for different endpoints




app.listen(3000, () => {
    console.log('listening on port 3000')
})