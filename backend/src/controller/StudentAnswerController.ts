import { Request, Response } from "express";
import StudentAnswersService, { StudentAnswer } from "../services/StudentAnswersService";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { GET } from "../decorators/restful";
@Injectable
export default class StudentAnswerController {
    @Inject(StudentAnswersService)
    protected service: StudentAnswersService;


    @GET("/student_answer")
    async get(req: Request, res: Response): Promise<StudentAnswer[]> {
        return this.service.getAll();
    }
}
