const EDITOR_EXTENSION_ID = 'camoceckaeifkkpepgjoccjfjkcjhojc';
class Client {
    constructor() {
        this.CHROME_ID = EDITOR_EXTENSION_ID
        this.state = "IDLE";
        this.currentAccount = {
            address: null,
            index: null
        };
    }
};
Client.EDITOR_EXTENSION_ID = EDITOR_EXTENSION_ID;
Client.prototype.connect = require('./methods/connect');
Client.prototype.disconnect = require('./methods/disconnect');
Client.prototype.fetchCurrentAccount = require('./methods/fetchCurrentAccount');
Client.prototype.getCurrentAccount = require('./methods/getCurrentAccount');
Client.prototype.isConnected = require('./methods/isConnected');
Client.prototype.sendMessage = require('./methods/sendMessage');
module.exports = Client;
