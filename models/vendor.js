const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

const vendorSchema = new Schema({

    vendor_name:{type:String,require:true},
    email: { type: String, require: true },
    phone_number:{type:String,require:true},
    address:{type:String,require:true},
    username:{type:String,require:true},
    password: { type: String, require: true }

});

module.exports = mongoose.model('Vendor', vendorSchema);