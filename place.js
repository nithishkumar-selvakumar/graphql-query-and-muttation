const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const placeData = new Schema({
  placename:String,
  districtname:String
})

module.exports = new mongoose.model('Place',placeData);