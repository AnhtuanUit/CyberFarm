var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    type: { /*1.gateway 2.nodeVan 3.nodeMotor 4.nodeSensor*/
        type: Number,
        required: true,
        min: 1,
        max: 4
    },
    MAC: {
        type: String
    },
    isConnected: {
        type: Boolean,
        default: false
    },
    isActived: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    activedAt: Date
}, {
    collection: 'nodes'
});

module.exports = mongoose.model('Nodes', NodeSchema);

