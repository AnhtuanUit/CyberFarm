#!/usr/bin/env node

var debug = require('debug')('app');
var app = require('./app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    //var socketIO = require('./socketio')(server);
    console.log('CyberFarming listening on port ' + server.address().port);
});
