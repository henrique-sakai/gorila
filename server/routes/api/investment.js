const express = require('express');
const mongodb = require('mongodb');
const{connectCollection} = require('./utils.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const investment_collection = await connectCollection('investment');

    res.send(await investment_collection.find({}).toArray());
});

//add investment
router.post('/:id', async (req, res) =>{
    const investment_collection = await connectCollection('investment');

    let investment = {
        type: req.body.type,
        value: req.body.value,
        date: req.body.date
    }

    await investment_collection.insertOne(investment, function(err, newInvestment) {
        if(err) throw err;

        res.status(201).send({
            _id: newInvestment.insertedId
        });
    });

});

router.delete('/:id', async (req, res) => {
    const investment_collection = await connectCollection('investment');

    await investment_collection.deleteOne
        ( {_id: new mongodb.ObjectID(req.params.id) }, 
        function(err, result) {
            if(err) res.status(500).send(err);

            else res.status(200).send("Investment deleted " + req.params.id);
        }
    )

});

module.exports = router;