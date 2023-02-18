
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { DELETE, GET, POST, PUT } from "../decorators/restful";
import UserService from "../services/UserService";
import { User } from "../services/UserService";
import { Question } from "../services/QuestionService";
import QuestionService from "../services/QuestionService";
import { Request, Response } from "express";
@Injectable
export default class QuestionController{
    @Inject(QuestionService)
    protected service: QuestionService;
    public static defaultPath = "/question";

    @GET("/question")
    async get(req: Request, res: Response): Promise<Question[]> {
        return this.service.getAll();
    }
}
