# monapay
NodeJS wrapper/toolkit for [MonaPay](https://monapay.com) v1


### Install via NPM

```
npm i monapay -s
```

### Usage
```js
const MonaPay = require('monapay');
const client = new MonaPay('merchant_id', 'product_key');

let response = client.paymentLink({
    uuid: 'blessingpariola123x', // compulsory
    amount: 500, // -> amount in NGN (500)
    refId: 'b1234567890p', // optional
    description: 'purpose of payment' //optional
});
console.log(response);
```

### Available methods
- paymentLink `-> { refId: string, link: string }`
> This method generates a payment link in which the developer calls either as a redirect or in an iframe
- verifyTransaction `-> { response: object }`
> This method generates a payment link in which the developer calls either as a redirect or within an iframe


## Thanks!