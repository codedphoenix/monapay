const request = require('request');
const querystring = require('querystring');

const acceptedChar = ' abcdefghijklmnopqrstuvwxyz0123456789';

/**
 * @param  {string} merchantId
 * @param  {string} productKey
 * @description Creates a MonaPay client
 * @returns {Monapay}
 */
function MonaPay(merchantId, productKey) {
    if (!merchantId || !productKey || merchantId == '' || productKey == '') {
        throw 'Please supply both values';
    }

    this.merchantId = merchantId;
    this.productKey = productKey;
    this.link_endpoint = 'https://www.monapay.com/v1/merchant/pay?';
    this.verify_endpoint = 'https://www.monapay.com/v1/merchant/verifytransaction';
}


/**
 * @param  {object} data
 * @description An object containing the Amount (NGN) & User's UUID
 */
MonaPay.prototype.paymentLink = function (data) {
    if (!data || !data.amount || parseFloat(data.amount) == 0 || !data.uuid || data.uuid == '') {
        throw 'Invalid Parameters';
    }

    const request = {
        reference_id: 'MG' + Date.now(),
        merchant_id: this.merchantId,
        product_key: this.productKey,
        uuid: strip(data.uuid),
        amount: parseFloat(data.amount) * 100,
    }

    if (data.refId) request.reference_id = data.refId;
    if (data.description) request.description = data.description;

    return {
        refId: request.reference_id,
        link: this.link_endpoint + querystring.stringify(request)
    }
}

/**
 * @param  {string} refId
 * @description Returns the response from a validation request
 */
MonaPay.prototype.verifyTransaction = function (refId) {
    if (!refId) throw 'Invalid Reference Id';

    return new Promise((resolve, reject) => {
        let options = {
            url: this.verify_endpoint + '/' + refId,
            headers: {
                'Authorization': 'Basic ' + this.productKey
            }
        };

        request(options, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            };
            resolve(JSON.parse(body));
        });
    });
}

/**
 * @param  {string} text
 */
let strip = (text) => {
    var stripped = '';
    for (letter of text.toLowerCase()) {
        if (acceptedChar.includes(letter)) stripped += letter;
    }
    return stripped;
}

module.exports = MonaPay;