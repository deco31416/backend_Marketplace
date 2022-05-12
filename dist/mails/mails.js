"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
class SendMails {
    constructor(receiverMail) {
        this.receiverMail = receiverMail;
    }
    sendMessage() {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_MAIL,
                    pass: process.env.SENDER_MAIL_PASSWORD
                }
            });
            const code = Math.round(Math.random() * (9999 - 1000) + 1000);
            const message = 'Your verification code is: ' + code;
            const mailOptions = {
                from: process.env.SENDER_MAIL,
                to: this.receiverMail,
                subject: 'Change password',
                text: message
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject({ error });
                }
                else {
                    console.log('Message sended: ' + info.response);
                    resolve(code);
                }
            });
        });
    }
}
exports.default = SendMails;
//# sourceMappingURL=mails.js.map