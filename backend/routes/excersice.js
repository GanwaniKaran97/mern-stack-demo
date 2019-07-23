const router = require('express').Router()
let Excersice = require('../models/excersice')

router.route('/').get((req,res) => {
    Excersice.find()
             .then(excersices => res.json(excersices))
             .catch(err => res.status(400).json('Error: '+err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExcersice = new Excersice({username,description,duration,date})    
    newExcersice.save()
                .then(() => res.json("Excersice added successfully"))
                .catch(err => res.status(400).json("Error: "+err))
});

router.route('/:id').get((req,res) => {
    Excersice.findById(req.params.id)
             .then(excersice => res.json(excersice))
             .catch(err => res.status(400).json("Error: "+err))
});

router.route('/:id').delete((req,res) => {
     Excersice.findByIdAndDelete(req.params.id)
              .then(() => res.json("Excersice deleted"))
              .catch(err => res.status(400).json("Error: "+err))
});

router.route('/update/:id').put((req,res) => {
    let update = req.body
    Excersice.findByIdAndUpdate(req.params.id,update,{new: true})
            .then(excersice => {
                excersice.save()
                         .then(() => res.json("Excersice updated"))
                         .catch(err => res.status(400).json("Errors:"+err))
            })
            .catch(err => res.status(400).json("Error: "+err))
})

module.exports = router