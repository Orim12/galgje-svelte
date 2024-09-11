import SMTPConnnection from "nodemailer/lib/smtp-connection";

export function smtpTransport(): SMTPConnnection.Options {
    if (
        !process.env.SMTP_HOST ||
        !process.env.SMTP_PORT ||
        !process.env.SMTP_PASS ||
        !process.env.SMTP_USER ||
        !process.env.SMTP_SECURE
    ) {
        throw new Error(
            'SMTP_HOST, SMTP_PORT, SMTP_PASS, SMTP_USER, and SMTP_SECURE must be provided in environment variables'
        );
    }

    return {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    };
}
