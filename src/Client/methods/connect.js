function setDebugListener(){
    window.addEventListener("message", async (message)=>{
        console.log('DEBUG: MESSAGE', {message});
        return true
    });
}

const onConnectAwait = function (event) {
    const {args, type} = event.data;
    if (type === 'ACCOUNT') {
        this.state = 'connected';
        res(true);
        window.removeEventListener("message", onConnectAwait);
    }
}
const onAccountUpdate = function (event) {
    const {args, type} = event.data;
    if (type === 'ACCOUNT') {
        console.log('Updating account', JSON.stringify(args));
        this.currentAccount = args[0]
    }
};
module.exports = async function connect() {
    const self = this;
    const EDITOR_EXTENSION_ID = this.CHROME_ID;
    setDebugListener();

    return new Promise((resolve) => {
        console.log('[Client] Connecting...');

        const handleResponse = function (response){
            console.log(`[Client] ${response.action} - ${JSON.stringify(response.args)}`);
            if (response && response.action === 'CONNECT') {
                this.state = 'connected';

                this.fetchCurrentAccount()
                    .then((res)=>{
                        resolve(res);
                    })
                window.removeEventListener("message", onConnectAwait);
            }
        }

        chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "CONNECT"}, handleResponse.bind(this));
        window.addEventListener("message", onAccountUpdate.bind(self));
        window.addEventListener("message", onConnectAwait.bind(self));
        if (chrome.runtime.onMessage) {
            // Context not available within a page, but available and needed when called fro register.html
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                console.log({messageReceivedInIndex: message});
            })
        }
    });
}
