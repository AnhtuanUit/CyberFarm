var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MACSchema = new Schema({
    serial: Number,
    
}, {
    collection: 'MACs'
});

module.exports = mongoose.model('Nodes', MACSchema);

