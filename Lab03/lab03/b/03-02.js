const secondJob = () => {
    return new Promise((resolve, reject) => {
       setTimeout(() => {
           reject('Job failed');
       }, 3000);
    });
}

secondJob()
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

async function processSecondJob() {
    try {
        const result = await secondJob();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

processSecondJob();