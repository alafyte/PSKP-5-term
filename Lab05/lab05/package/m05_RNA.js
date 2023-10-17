const nodemailer = require("nodemailer");

const send = (mailAddr, mailPass, message) => {
    const options = {
        from: mailAddr,
        to: mailAddr,
        subject: "Lab05 task #3",
        text: message,
    };
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        service: "Gmail",
        auth: {
            user: mailAddr,
            pass: mailPass,
        },
    });


    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

exports.send = send;