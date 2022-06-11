"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_ffeedbacks_repositories_1 = require("./repositories/prisma/prisma-ffeedbacks-repositories");
const submit_feedback_use_case_1 = require("./use-cases/submit-feedback-use-case");
exports.routes = (0, express_1.Router)();
exports.routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_ffeedbacks_repositories_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackUsecase = new submit_feedback_use_case_1.SubmitFeedbackUsecase(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackUsecase.execute({
        type,
        comment,
        screenshot
    });
    res.status(201).send();
});
