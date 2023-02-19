import { Request, Response } from "express";
import StudentAnswersService, { StudentAnswer } from "../services/StudentAnswersService";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { GET, POST } from "../decorators/restful";
import { arrayToObject } from "../lib/arrayToObject";
import Log from "log4fns";
import RequestAuth from "../decorators/requireAuth";
import { STUDENT,INSTRUCTOR } from "../lib/constant";

@Injectable
export default class StudentAnswerController {
    @Inject(StudentAnswersService)
    protected service: StudentAnswersService;

    @RequestAuth(STUDENT)
    @GET("/student_answer")
    async get(req: Request, res: Response): Promise<StudentAnswer[]> {
        return this.service.getAll();
    }

    @RequestAuth(STUDENT)
    @GET("/assignment/:user_id/:assignment_id")
    async getStudentAns(req: Request, res: Response) {
        const { user_id, assignment_id } = req.params;
        const result = await this.service.getStudentAnsForAssignment(user_id, assignment_id);
        return arrayToObject(result, "question_id");
        //const results = await this.service.getAll()
        //return results.filter(result=>result.user_id == user_id && result.assignment_id==assignment_id)
    }

    @RequestAuth(STUDENT)
    @POST("/assignment/questions/:user_id")
    async saveStudentAns(req: Request, res: Response) {
        const { user_id } = req.params;
        const answers = req.body;
        try {
            for (const answer of answers) {
                const studentAnswer = {
                    user_id: parseInt(user_id),
                    answer: answer.student_answer,
                    issubmit: answer.issubmit,
                    question_id:answer.question_id
                };
                if (answer.student_answers_id) {
                    await this.service.updateStudentAns(answer.student_answers_id,studentAnswer);
                } else {
                    await this.service.create(studentAnswer);
                }
            }
        } catch (err) {
            throw err;
        }

        /* const { answer, issubmit } = req.body;
        const record = await this.service.getByUserIdAndQuestionId(user_id, question_id);
        const studentAnswer = { user_id: parseInt(user_id), question_id: parseInt(question_id), answer, issubmit };
        if (record) {
            return this.service.updateStudentAns(studentAnswer);
        } else {
            return this.service.create(studentAnswer);
        } */
    }
}
