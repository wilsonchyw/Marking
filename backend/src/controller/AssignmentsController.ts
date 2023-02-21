import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import RequestAuth from "../decorators/requireAuth";
import { GET } from "../decorators/restful";
import { INSTRUCTOR, STUDENT } from "../lib/constant";
import AssignmentsService, { Assignment } from "../services/AssignmentsService";

@Injectable
export default class AssignmentsController {
    @Inject(AssignmentsService)
    protected service: AssignmentsService;
    public static defaultPath = "/question";

    @RequestAuth(STUDENT)
    @GET("/assignment")
    async get(req: Request, res: Response): Promise<Assignment[]> {
        return this.service.getAll();
    }

    /**
     * A route handler function that returns the list of questions and their answers for a specific assignment ID.
     *
     * @function
     * @param {Object} req - The Express request object.
     * @param {Object} res - The Express response object.
     * @param {string} req.params.assignmentId - The ID of the assignment to retrieve questions and answers for.
     * @returns {Promise<Array<Object>>} An array of question objects with their associated answers.
     */
    @RequestAuth(STUDENT)
    @GET("/assignment/:assignmentId")
    async getAssignmentsById(req: Request, res: Response) {
        const result = await this.service.getById(req.params.assignmentId);
        //return result;
        if (result.length) {
            const questions = result.reduce((acc, curr) => {
                const key = curr.question_id;
                if (!acc[key]) {
                    const { id, answer, ...rest } = curr;
                    acc[key] = { ...rest, answer: [] };
                }
                acc[key].answer.push(curr.answer);
                return acc;
            }, {});
            return Object.values(questions);
        }
        return result;
    }

    @RequestAuth(STUDENT)
    @GET("/assignment/status/:user_id")
    async getCompleteStatus(req: Request, res: Response) {
        const { user_id } = req.params;
        const user = req.user;
        if (user.role == STUDENT && user.id != user_id) throw "Not enough permission";
        const result = await this.service.getCompleteStatus(user_id);
        return result;
    }

    @RequestAuth(INSTRUCTOR)
    @GET("/instructor/assignment/:user_id")
    async getCompletedAssignmentsByUserId(req: Request, res: Response) {
        const { user_id } = req.params;
        const result = await this.service.getCompletedByUserId(user_id);
        return result;
    }
}
