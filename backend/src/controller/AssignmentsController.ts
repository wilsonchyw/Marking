import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { GET } from "../decorators/restful";
import AssignmentsService, { Assignment } from "../services/AssignmentsService";
import Log from "log4fns";
import { arrayToObject } from "../lib/arrayToObject";

@Injectable
export default class AssignmentsController {
    @Inject(AssignmentsService)
    protected service: AssignmentsService;
    public static defaultPath = "/question";

    @GET("/assignment")
    async get(req: Request, res: Response): Promise<Assignment[]> {
        return this.service.getAll();
    }

    // Get questions and answer for single assignment
    @GET("/assignment/:assignmentId")
    async getAssignmentsById(req: Request, res: Response) {
        const result = await this.service.getById(req.params.assignmentId);
        //return result;
        if (result.length) {
            const questions = result.reduce((acc, curr) => {
                const key = curr.question_id;
                if (!acc[key]) {
                    const {id,answer,...rest} = curr
                    acc[key] = {...rest,answer:[]};
                }
                acc[key].answer.push(curr.answer);
                return acc;
            }, {});
            return Object.values(questions)
        }
        return result;
    }

    @GET("/assignment/status/:userId")
    async getCompleteStatus(req: Request, res: Response) {
        const result = await this.service.getCompleteStatus(req.params.userId);
        return result
        return arrayToObject(result,"assignment_id");
        if (result.length) {
            const completeStatus = result.reduce((acc, curr) => {
                const {assignment_id} = curr;
                acc[assignment_id] = curr;
                return acc;
            }, {});
            return completeStatus
        }
        
    }



    @GET("/instructor/assignment/:id")
    async getCompletedAssignmentsByUserId(req: Request, res: Response) {
        Log(req.params.id);
        const result = await this.service.getCompletedByUserId(req.params.id);
        return result;
    }
}
