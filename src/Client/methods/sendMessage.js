module.exports = async function sendMessage(message){
    const EDITOR_EXTENSION_ID = this.CHROME_ID;
    return new Promise(async (res)=>{
        const x = await chrome.runtime.sendMessage(EDITOR_EXTENSION_ID, message, async (response)=>{
            console.log({response});
            console.log('lastError',chrome.runtime.lastError)
            res(response);
            return true;
        });
        console.log({x});
    })
}
