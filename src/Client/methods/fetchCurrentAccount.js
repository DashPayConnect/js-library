module.exports = async function connect() {
    const self = this;
    const EDITOR_EXTENSION_ID = this.CHROME_ID;

    return new Promise((resolve) => {
        console.log('[Client] Fetch Current Account...');

        const handleResponse = function (response){
            console.log(`[Client] ${response.action} - ${JSON.stringify(response.args)}`);
            if(response?.args && response.args[1]){
                self.currentAccount = response.args[1];
                self.currentAccount.balance = response.args[2] ?? 0;
                self.currentAccount.transactionHistory = response.args[3] ?? [];
                resolve(self.currentAccount);
            } else {
                console.log('UNHANDLED RESPONSE from Client.fetchCurrentAccount()', response);
                resolve(null)
            }
        }

        chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, {action: "FETCH", args: ['ACCOUNT']}, handleResponse.bind(this));
    });
}
