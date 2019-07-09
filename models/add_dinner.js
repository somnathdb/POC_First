var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dinnerSchema = new Schema({
    name:{type:String,require:true},
    phone_number:{type:Number,require:true},
    adults:{type:Number,require:true},
    kids:{type:Number,require:true},
    special_occassion: { type: String, require: true }

});


module.exports = mongoose.model('Dinner', dinnerSchema);