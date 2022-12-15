const { EDITOR_EXTENSION_ID } = require('../config.json')
class Client {
    constructor() {
        this.CHROME_ID = EDITOR_EXTENSION_ID
        this.state = "IDLE";
        this.account = null;
    }
};
Client.EDITOR_EXTENSION_ID = "kcaghheadgiepldjcemnmnmpkfchmpma";
Client.prototype.connect = require('./methods/connect');
Client.prototype.disconnect = require('./methods/disconnect');
Client.prototype.getAccount = require('./methods/getAccount');
Client.prototype.isConnected = require('./methods/isConnected');
Client.prototype.sendMessage = require('./methods/sendMessage');
module.exports = Client;
