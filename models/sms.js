const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const smsSchema = new Schema({
    channel: { type: String, required: true },
    source_number: { type: Number, required: true },
    destination_number: { type: Number, required: true },
    message: { type: String, required: true },
});



module.exports = mongoose.model('Sms', smsSchema);