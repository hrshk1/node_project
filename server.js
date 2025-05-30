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


//Middleware function:
//we can name logRequest anything but there must be the three parameters i.e req,res,next and the function should be used in the middle of the get

const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    //here new Date means making a new object and since it gives date and time object we need to change it to string so we use toLocaleString()
    //the req.originalUrl return the name of the url that has been requested
    next(); //move on to the next phase
}

app.get('/',logRequest,(req,res)=>{
    res.send('Welcome to our Hotel');
})

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