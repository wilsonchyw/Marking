import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { GET } from "../decorators/restful";
import AnswersService, { Answer } from "../services/AnswersService";

@Injectable
export default class AnswersController {
    @Inject(AnswersService)
    protected service: AnswersService;


    @GET("/answer")
    async get(req: Request, res: Response): Promise<Answer[]> {
        return this.service.getAll();
    }
}
