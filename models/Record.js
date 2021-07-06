const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({  
  id: String,
  name: String,  
  type: String,  
  unit: String,
  prices: [Number],
});

module.exports = Record = mongoose.model('Record', recordSchema);