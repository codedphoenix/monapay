const MonaPay = require('../index');
const expect = require('chai').expect;


describe('MonaPay Test', function () {
    this.timeout(5000);
    var client, refId;

    it('should create monapay client', function (done) {
        client = new MonaPay('merchantId', 'productKey');
        done();
    });

    it('should generate a payment link with a random refId', function (done) {
        const paymentLink = client.paymentLink({
            amount: 3000,
            uuid: 'blessingpariola'
        });
        expect(paymentLink).to.be.an('object');
        expect(paymentLink).to.have.property('refId');
        refId = paymentLink.refId;
        expect(paymentLink).to.have.property('link');
        done();
    });

    it('should verify transaction with previous transaction', function (done) {
        client.verifyTransaction(refId)
            .then(response => {
                expect(response).to.have.property('status');
                done();
            })
            .catch(error => {
                done(error);
            });
    });
});