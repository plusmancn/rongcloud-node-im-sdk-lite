'use strict';

var RYWatcher = require('../');

var yxlist = require('../config/user_list.example.json');

var watchers = yxlist.map(function(val){
  return new RYWatcher({
    'id': val._id.replace('youxin_', 'b'),
    'token': val.ry_token
  }, 'appId');
});
