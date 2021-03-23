const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const stateData = new Schema({
    statename:String
})

module.exports = new mongoose.model('State',stateData);