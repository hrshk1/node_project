const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const menuItemSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    taste:{
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true,
    },
    is_drink:{
        type: Boolean,
        default:false,
    },
    ingredients:{
        type: [String], //this means it is an array of strings
        default: [],
    },
    num_sales:{
        type: Number,
        default: 0,
    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
})

menuItemSchema.pre('save',async function(next){
    const menu = this;

    //hash the password only if it has been modified or is new
    if(!menu.isModified('password')) return next();

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);
        //hash password
        const hashedpassword = await bcrypt.hash(menu.password, salt);
        menu.password = hashedpassword;
        next();
    }
    catch(err){
        return next(err);
    }
})


menuItemSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
        //what does compare function do?
        //it removes salt from the actual pasword
        //it adds that salt into candiate password and then hashes it using the same hashing function
        //then it compares the new hashed password with the already hashed password that is saved
    }
    catch(err){

    }
}

const Menu = mongoose.model('Menu', menuItemSchema);
module.exports=Menu;