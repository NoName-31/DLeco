const mongoose = require('mongoose')
mongoose.pluralize(null);

const currencySchema = new mongoose.Schema({
    user : String,
    guild : String,
    wallet : Number,
    bank : Number,
});

module.exports = mongoose.model('econm', currencySchema)