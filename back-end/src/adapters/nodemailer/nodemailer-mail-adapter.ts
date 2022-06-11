import nodemailer from 'nodemailer';
import { MailAdapter, SendMailDAta } from "../mail-adapters";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "be38591124040c",
      pass: "20e0b7dca4eac7"
    }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail({ subject, body }: SendMailDAta) {
        await transport.sendMail({
          from: 'Equipe Feedget <teste@widget>',
          to: 'Elinaldo Sa <elinnaldosc@gmail.com>',
          subject,
          html: body,
        })
    }
}