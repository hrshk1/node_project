const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const Menu = require('./models/Menu');


//install passport and passport-local in terminal and require both of them and then write this function, your database must have username and password in it. this function has three callbacks username password and done in same order 
passport.use(new LocalStrategy(async(usern,password,done)=>{
    //authentication logic here
    try{
        //console.log('Recieved credentials:',usern, password);
        const user =await Menu.findOne({username:usern}); //in Menu we have username attribute for each menu
        //you will have to require menu in the top
        if(!user){
            return done(null,false,{message: 'Incorrect Username'})
            //done is a callback function with three arguments: (error,user,info)
        }
        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'Incorrect password'})
        }
    }
    catch(err){
        return done(err);
    }
}))

module.exports = passport; //export configured passport