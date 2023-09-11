const {v4: uuidv4} = require('uuid');


const validateCard = (cardNumber) => {
    console.log(`Validating card: ${cardNumber}`);
    return Math.random() < 0.5;
}


const proceedToPayment = (orderNumber) => {
    return new Promise((resolve, reject) => {
        if (Math.random() < 0.5) {
            resolve('Payment successful');
        } else {
            reject('Payment failed');
        }
    });
}


const createOrder = (cardNumber) => {
    return new Promise(async (resolve, reject) => {
        const isValidCard = validateCard(cardNumber);

        if (!isValidCard) {
            reject('Card is not valid');
            return;
        }

        const orderNumber = uuidv4();

        setTimeout(() => {
            resolve(orderNumber);
        }, 5000);
    });
}



createOrder('1234 5678 9012 3456')
    .then((orderNumber) => {
        console.log(`Order created successfully with number: ${orderNumber}`);
        return proceedToPayment(orderNumber);
    })
    .then((paymentResult) => {
        console.log(paymentResult);
    })
    .catch((error) => {
        console.error(error);
    });




