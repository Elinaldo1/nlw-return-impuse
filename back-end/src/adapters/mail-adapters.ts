export interface SendMailDAta {
    subject: string;
    body: string;
}

export interface MailAdapter {
    sendMail: (data: SendMailDAta) => Promise<void>;
} 