const {send} = require('./package/m05_RNA');

let mailAddr = "youremail@gmail.com";
let mailPass = "yourapppassword";

send(mailAddr, mailPass, "Привет");