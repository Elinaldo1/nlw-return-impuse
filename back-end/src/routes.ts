import console from 'console';
import { Router } from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-ffeedbacks-repositories';
import { SubmitFeedbackUsecase } from './use-cases/submit-feedback-use-case';


export const routes = Router();
  
  routes.post('/feedbacks', async(req, res) => {
      
      const { type, comment, screenshot } = req.body;
      try {
          
          const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
          const nodemailerMailAdapter = new NodemailerMailAdapter();
    
          const submitFeedbackUsecase = new SubmitFeedbackUsecase(
              prismaFeedbacksRepository,
              nodemailerMailAdapter
          )
    
          await submitFeedbackUsecase.execute({
              type,
              comment,
              screenshot
          })
    
        res.status(201).send();

      } catch (error) {
          console.log(error);
          return res.status(500).send();
      }
}); 