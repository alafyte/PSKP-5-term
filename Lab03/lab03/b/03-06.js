const calculateSquareWithDelay = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject('Invalid input: not a number');
            } else {
                resolve(Math.pow(number, 2));
            }
        }, 3000);
    });
}


const calculateCubeWithDelay = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject('Invalid input: not a number');
            } else {
                resolve(Math.pow(number, 3));
            }
        }, 1000);
    });
}


const calculateFourthPowerWithDelay = (number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof number !== 'number') {
                reject('Invalid input: not a number');
            } else {
                resolve(Math.pow(number, 4));
            }
        }, 2000);
    });
}

Promise.race([
    calculateSquareWithDelay(2),
    calculateCubeWithDelay(2),
    calculateFourthPowerWithDelay(2),
])
    .then((result) => {
        console.log(`First resolved result: ${result}`);
    })
    .catch((error) => {
        console.error(`Error: ${error}`);
    });


Promise.any([
    calculateSquareWithDelay(3),
    calculateCubeWithDelay(3),
    calculateFourthPowerWithDelay(3),
])
    .then((result) => {
        console.log(`First resolved result: ${result}`);
    })
    .catch((errors) => {
        console.error(`All promises were rejected: ${errors}`);
    });
