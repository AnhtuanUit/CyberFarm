var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
    userId: { 
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    type: { /*1.gateway 2.nodeVan 3.nodeMotor 4.nodeSensor*/
        type: Number,
        required: true
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
        default: Data.now
    },
    activedAt: Date
}, {
    collection: 'nodes'
});

module.exports = mongoose.model('Nodes', NodeSchema);

