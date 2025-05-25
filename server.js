const express = require('express');
const app = express();
const db = require('./db');
const Menu = require('./models/Menu');
const { error } = require('console');
app.use(express.json()); //middleware
require('dotenv').config();

//import the router file:
const menuRoutes = require('./routes/menuroutes');
//use the routers
app.use('/menu',menuRoutes)
//similarly you can make many such routes for different endpoints



const PORT = process.env.PORT ||3000
app.listen(PORT, () => {
    console.log('listening on port 3000')
})
//if file is ready to be commited that means it is only added then vs code will show green color
//if commited, it becomes normal color
//if committed and chnages are being made then yellow color will appear

//procedure for github:
//make a new repo
//write the codes written in intrustion in the terminal 
//code will be uploaded

//only after git push, changes are reflected in git hub
//similarly there is git pull to extract changes in github to local