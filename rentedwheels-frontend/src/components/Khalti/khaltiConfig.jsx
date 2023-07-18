
let config = {
    // replace this key with yours
    "publicKey": "test_public_key_5e13e6b9306841f28f41d5760deae767",
    "productIdentity": "007",
    "productName": "Rented Wheels",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;