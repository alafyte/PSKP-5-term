const { send } = require('rna_m05');

let mailAddr = "youremail@gmail.com";
let mailPass = "yourapppassword";

send(mailAddr, mailPass, "Hello from published module");
