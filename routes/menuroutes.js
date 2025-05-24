const express= require('express')
const router = express.Router();
const Menu = require('./../models/Menu'); //since models is one folder back therefore we use double dots
const { error } = require('console');
//you will have to import menu because you have used menu models in get and post


//you don't have to use /menu again instead just wrote / over here
router.get('/', async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('data fetched')
        res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/', async (req, res) => {
    try {
        //post se data req ki body me jayega to uske lye hm ye krte h 
        const data = req.body;
        //mongoose model ki help se new menu banana
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch (err) {
        console.error("❌ Error:", err.message);
        res.status(500).json({ error: err.message });
    }

});

router.get('/ingredients/:ingredient', async (req, res) => {
    try {
        const ingredient = req.params.ingredient; //extract the ingredients from the url parameter
        if (ingredient == 'paneer' || ingredient == 'onion' || ingredient == 'spices') {
            const response = await Menu.find({ ingredients: ingredient });
            console.log('response fetched')
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid Ingredient'})
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}
);

router.get('/taste/:tastetype',async(req, res)=>{
    try{
        const tastetype = req.params.tastetype;
        if(tastetype==='sweet'||tastetype==='spicy'||tastetype==='sour'){
            const response2 = await Menu.find({taste:tastetype});
            console.log('response fetched')
            res.status(200).json(response2);
        }
        else{
            res.status(404).json({error:'Invalid taste type'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'})
    }
});

//updation
//for updation we need the unique object id and what we need to change
//we pass the id using parameter and updated data in req.body
//there is no need to add __ before id
router.put('/:id',async(req,res)=>{
    try{
    const menuid = req.params.id //extract the id from the url paramater
    const updateddata = req.body; //extract the data as variable from req.body

    const response3 = await Menu.findByIdAndUpdate(menuid,updateddata,{
        new:true, //if we want to return the updated data in response then we use this
        runValidators: true, //run all the mongoose validations on the updated data like required and datatype and all that we have set in the scheema
    })
    if(!response3){
        return res.status(404).json({error: 'Person not found'})
        //if there was no document by this id
    }
    console.log('data updated')
    res.status(200).json(response3)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})



//deletion operation
router.delete('/:id', async(req,res)=>{
    try{
        const deleteid = req.params.id;
        const response4 = await Menu.findByIdAndDelete(deleteid)
        if(!response4){
            return res.status(404).json({error: 'No Such Document Found'})
        }
        console.log('data deleted')
        res.status(200).json(response4)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})


module.exports = router;