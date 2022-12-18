const EDITOR_EXTENSION_ID = 'camoceckaeifkkpepgjoccjfjkcjhojc';
class Client {
    constructor() {
        this.CHROME_ID = EDITOR_EXTENSION_ID
        this.state = "IDLE";
        this.currentAccount = {
            address: null,
            index: null
        };
        this.dashInstance = null;
    }
    requestTransaction(opts){
        const self = this;
        const EDITOR_EXTENSION_ID = this.CHROME_ID;

        return new Promise((resolve) => {
            console.log('[Client] Request Transaction ' + JSON.stringify(opts));

            const handleResponse = function (response){
                console.log(`[Client] ${response.action} - ${JSON.stringify(response.args)}`);
                resolve(response);
            }

            chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "EXECUTE", args: ['TRANSACTION', opts.address, opts.amount]}, handleResponse.bind(this));
        });
    }
    async initDashInstance(){
        if(!chrome.runtime){
            const Dash = require('../../../platform/packages/js-dash-sdk/dist/dash.min');
            this.dashInstance = new Dash.Client();
        }
    }
    async getDocuments(typeLocator, fetchOpts){

        // console.log(Dash);
        // const client = new Dash.Client();
        // console.log(client);
        // const getDocuments = async () => {
        //     return client.platform.documents.get(typeLocator, fetchOpts);
        // };
        //
        // return getDocuments()
        //     .then((d) => {
        //         for (const n of d) {
        //             console.log('Document:\n', n.toJSON());
        //         }
        //         return d;
        //     })
        //     .catch((e) => console.error('Something went wrong:\n', e))
        //     .finally(() => client.disconnect());



        // return client.platform.documents.get(typeLocator, fetchOpts);
        // const self = this;
        // const EDITOR_EXTENSION_ID = this.CHROME_ID;
        //
        // return new Promise((resolve) => {
        //     console.log('[Client] Get Documents ' + JSON.stringify({typeLocator,fetchOpts}));
        //
        //     const handleResponse = function (response){
        //         console.log(`[Client] ${response.action} - ${JSON.stringify(response.args)}`);
        //         resolve(response);
        //     }
        //
        //     chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "FETCH", args: ['DOCUMENTS', typeLocator, JSON.stringify(fetchOpts)]}, handleResponse.bind(this));
        // });
        // const documents = await client.platform.documents.get('tutorialContract.note', {
        //     limit: 2,
        // });
    }
    switchCurrentAccount(walletId, index){
        const self = this;
        const EDITOR_EXTENSION_ID = this.CHROME_ID;

        return new Promise((resolve) => {
            console.log('[Client] Request Switch ' + JSON.stringify({walletId,index}));

            const handleResponse = async function (response){
                console.log(`[Client] ${response.action} - ${JSON.stringify(response.args)}`);
                await self.fetchCurrentAccount();
                resolve(response);
            }

            chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "EXECUTE", args: ['SWITCH_ACCOUNT', walletId, index]}, handleResponse.bind(this));
        });
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
