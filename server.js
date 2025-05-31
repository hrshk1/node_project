const express = require('express');
const app = express();
const db = require('./db');
const Menu = require('./models/Menu');
const { error } = require('console');
app.use(express.json()); //middleware
require('dotenv').config();
const passport = require('passport')



//Middleware function:
//we can name logRequest anything but there must be the three parameters i.e req,res,next and the function should be used in the middle of the get

const logRequest = (req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    //here new Date means making a new object and since it gives date and time object we need to change it to string so we use toLocaleString()
    //the req.originalUrl return the name of the url that has been requested
    next(); //move on to the next phase
    //next is very imp otherwise function will stop at middleware
}

app.use(logRequest);//if it used this way then this middleware will run on all routes


app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session:false})
//app.use(localAuthMiddleware); //if you use this in this way then it will be applied to all routes
//import the router file:
const menuRoutes = require('./routes/menuroutes');
//use the routers
app.use('/menu',menuRoutes) // if i want passport to run for menu i will write localAuthMiddleware in btween in line
//similarly you can make many such routes for different endpoints

//if you want your middleware function to be applied on all routes then you have to keep the routes below the app.use 

app.get('/',localAuthMiddleware,(req,res)=>{
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