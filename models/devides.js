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
        required: true,
        min: 2,
        max: 4
    },
    time: Number,
    process: {
        type: Number,
        default: 0,
        min: 0,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
}, {
    collection: 'devices'
});

module.exports = mongoose.model('Devices', DeviceSchema);

