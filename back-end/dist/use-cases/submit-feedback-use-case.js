"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackUsecase = void 0;
class SubmitFeedbackUsecase {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error("Type is required");
        }
        ;
        if (!comment) {
            throw new Error("Comment is required");
        }
        ;
        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error("Invalid screenshot format");
        }
        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sams-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<image src="${screenshot}" style ="height: 300px;
                width: 300px;" />` : null,
                `<div/>`
            ].join('\n')
        });
    }
}
exports.SubmitFeedbackUsecase = SubmitFeedbackUsecase;
