const mongoose = require('mongoose');
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
const Menu = mongoose.model('Menu', menuItemSchema);
module.exports=Menu;