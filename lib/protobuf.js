'use strict';
var path = require('path');
var ProtoBuf = require('protobufjs'),
    dotProtoPath = path.join(__dirname, '../config/rongcloud.proto');
var Modules = ProtoBuf.loadProtoFile(dotProtoPath).build('Modules').probuf;

module.exports = {
    Modules: Modules,
    Long: ProtoBuf.Long
};

