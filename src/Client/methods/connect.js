module.exports = async function connect() {
    const EDITOR_EXTENSION_ID = this.CHROME_ID;
    window.addEventListener("message", async (message)=>{
        console.log('DEBUG: MESSAGE', {message});
        return true
    });

    const self = this;

    return new Promise((resolve) => {
        chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "CONNECT"},
            function (response) {
                console.log({receivedResponseFromConnect: response});
                if (response && response.action === 'CONNECT') {
                    this.state = 'connected';
                    //FIXME: Should use another internal to handle this.
                    chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "FETCH", args: ['ACCOUNT']}, (response)=>{
                        if(response?.args && response.args[1]){
                            self.account = response.args[1];
                            resolve(self.account);
                            window.removeEventListener("message", onConnectAwait);
                        }
                    });
                }
            });


        const onAccountUpdate = function (event) {
            const {args, type} = event.data;
            if (type === 'ACCOUNT') {
                self.account = args[0]
                console.log('THIS ACCOUNT SET', self.account);
            }
        };
        const onConnectAwait = function (event) {
            const {args, type} = event.data;
            if (type === 'ACCOUNT') {
                this.state = 'connected';
                res(true);
                window.removeEventListener("message", onConnectAwait);
            }
        }

        window.addEventListener("message", onAccountUpdate);
        if (chrome.runtime.onMessage) {
            // Context not available within a page, but available and needed when called fro register.html
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                console.log({messageReceivedInIndex: message});
            })
        }
        window.addEventListener("message", onConnectAwait);
    });
}
