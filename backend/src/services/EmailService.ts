import nodemailer from "nodemailer";

interface EmailOption {
    receiver: string;
    title: string;
    content: string;
}

export default class EmailService {
    private static transporter;

    static async sendEmail({ receiver, title, content }: EmailOption) {
        if (!EmailService.transporter) {
            EmailService.transporter = nodemailer.createTransport({
                service: process.env.MAILER_PROVIDER ?? "gmail",
                auth: {
                    user: process.env.MAILER_USER,
                    pass: process.env.MAILER_PASSWORD,
                },
            });
        }

        const mailOptions = {
            from: process.env.MAILER_USER,
            to: receiver,
            subject: title,
            text: content,
        };

        return new Promise((resolve, reject) => {
            EmailService.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info.response);
                }
            });
        });
    }
}
