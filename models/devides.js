var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
    nodeId: { 
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    type: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    process: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
}, {
    collection: 'devices'
});

module.exports = mongoose.model('Devices', DeviceSchema);

