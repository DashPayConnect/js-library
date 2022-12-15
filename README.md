# js-library
JS library to interact with the DashPay Connect Extension

# Usage
`npm i @dashpayconnect/js-library`

```js 
const { Client } = require('@dashpayconnect/js-library');

const client = new Client();

(async ()=>{
    await client.connect()
    const account = client.getAccount();
})();
```

# Development

Run `yarn run build` to build the distributable library.


