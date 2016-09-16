var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NodeSchema = new Schema({
    userId: { 
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'Users' 
    },
    type: {
        type: Number,
        required: true
    },
    MAC: {
        type: String,
        required: true
    },
    isConnected: {
        type: Boolean,
        default: false
    },
    isActived: {
        type: Boolean,
        default: false
    },
    isProduced: {
        type: Boolean,
        default: false
    },
    producedAt: Date,
    activedAt: Date
}, {
    collection: 'nodes'
});

module.exports = mongoose.model('Nodes', NodeSchema);

