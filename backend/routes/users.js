const router = require('express').Router();
let User = require('../models/user');

router.route('/').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' +err))
});

router.route('/add').post((req,res) => {
    const username = req.body.username
    const newUser = new User({username})
    newUser.save()
           .then(() => res.json("User added successfully"))
           .catch(err => res.status(400).json('Error: '+err ))
});

router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json("User deleted"))
        .catch(err => res.status(400).json("Error "+err))
})

module.exports = router