'use strict';

var RYWatcher = require('../');

var watcher = new RYWatcher({
  'id': 'user_id',
  'token': 'ry_token'
}, 'app_id', {
    showLog: false // 是否打印 Log 日志
});


watcher.on('message', function(type, userId, message){
    console.log(type, userId, message);
});
