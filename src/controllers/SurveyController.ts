import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveyRepository";


class SurveysController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;
        const surveyRepository = getCustomRepository(SurveysRepository);

        const survey = surveyRepository.create({
            title,
            description
        });

        await surveyRepository.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);
        const survey = await surveysRepository.find();
        return response.status(200).json(survey);
    }
}

export { SurveysController };