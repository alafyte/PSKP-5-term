const calculateSquare = (number) => {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject('Invalid input: not a number');
        } else {
            resolve(Math.pow(number, 2));
        }
    });
}


const calculateCube = (number) => {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject('Invalid input: not a number');
        } else {
            resolve(Math.pow(number, 3));
        }
    });
}

const calculateFourthPower = (number) => {
    return new Promise((resolve, reject) => {
        if (typeof number !== 'number') {
            reject('Invalid input: not a number');
        } else {
            resolve(Math.pow(number, 4));
        }
    });
}

const inputNumber = 5;

Promise.all([
    calculateSquare(inputNumber),
    calculateCube(inputNumber),
    calculateFourthPower(inputNumber),
])
    .then((results) => {
        console.log(`Square: ${results[0]}`);
        console.log(`Cube: ${results[1]}`);
        console.log(`Fourth Power: ${results[2]}`);
    })
    .catch((error) => {
        console.error(error);
    });

