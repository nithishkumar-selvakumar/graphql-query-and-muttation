const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const districtData = new Schema({
    statename:String,
    districtname:String
})

module.exports = new mongoose.model('District',districtData);