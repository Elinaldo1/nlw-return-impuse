import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedback-repository";


// Aplicação do princípio de inersão de dependências
// deixar aplicação(use-case) completamente desacoplado, independente do prisma


interface SubmitFeedbackUseCaseRequest {
    type: string;
    comment: string;
    screenshot: string;
}

export class SubmitFeedbackUsecase {

    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter,
    ) {}


    async execute(request: SubmitFeedbackUseCaseRequest){
        const { type, comment, screenshot  } = request;

        if(!type){
            throw new Error("Type is required");

        };

        if(!comment){
            throw new Error("Comment is required");

        };

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error("Invalid screenshot format");

        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sams-serif; font-size: 16px; color: #222;">`,
                `<p>Tipo de feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ?`<image src="${screenshot}" style ="height: 300px;
                width: 500px;" />`: null,
                `<div/>`
            ].join('\n')
        })

    }

}
