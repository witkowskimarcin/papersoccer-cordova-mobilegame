cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-websocket.websocket",
      "file": "plugins/cordova-plugin-websocket/www/websocket.js",
      "pluginId": "cordova-plugin-websocket",
      "clobbers": [
        "WebSocket"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-websocket": "0.12.2"
  };
});