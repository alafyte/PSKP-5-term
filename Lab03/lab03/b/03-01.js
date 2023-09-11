const firstJob = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello World");
        }, 2000);
    });
}

firstJob()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function processFirstJob() {
    try {
        const result = await firstJob();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

processFirstJob();