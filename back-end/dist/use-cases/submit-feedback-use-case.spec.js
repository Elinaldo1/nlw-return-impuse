"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
// spies = espiões
// não posso me assegurar que o email foi enviado
// mas tenho que me assegurar que a function de envio foi chamada
// caso contrário o test irá passar caso remova a função de envio de email
// jest.fn é uma function espiã, sem funcionalidade, mas conseguimos saber se elea foi chamada ou não
const createFeedbackSpy = jest.fn();
const sendEmailSpy = jest.fn();
const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbackUsecase({ create: createFeedbackSpy }, { sendMail: sendEmailSpy });
describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,hjhjhjhjhjh',
        })).resolves.not.toThrow();
        // Eu espero que as funtions createFeedbackSpy e sendEmailSpy tenham sido chamadas
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendEmailSpy).toHaveBeenCalled();
    });
    it('should not be able to submit feedback whithout type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,hjhjhjhjhjh',
        })).rejects.toThrow();
    });
    it('should not be able to submit feedback whithout comment', async () => {
        await expect(submitFeedback.execute({
            type: 'jkjkj',
            comment: '',
            screenshot: 'data:image/png;base64,hjhjhjhjhjh',
        })).rejects.toThrow();
    });
    it('should not be able to submit feedback whit invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'jkjkj',
            comment: 'fgg',
            screenshot: '123',
        })).rejects.toThrow();
    });
});
