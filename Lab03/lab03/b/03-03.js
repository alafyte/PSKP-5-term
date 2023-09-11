const thirdJob = (data) => {
    return new Promise((resolve, reject) => {
        if (typeof data !== 'number') {
            reject('error');
        } else if (data % 2 === 1) {
            setTimeout(() => {
                resolve('odd');
            }, 1000);
        } else if (data % 2 === 0) {
            setTimeout(() => {
                reject('even');
            }, 2000);
        }
    });
}

thirdJob(3)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function processThirdJob(data) {
    try {
        const result = await thirdJob(data);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

processThirdJob("jjjj");


