const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const ExcersiceSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true}
}, {
    timestamps: true
});

const Excersice = moongoose.model('Excersice', ExcersiceSchema);
module.exports = Excersice;