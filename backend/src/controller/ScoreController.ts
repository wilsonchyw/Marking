import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { GET, POST } from "../decorators/restful";
import AssignmentsService, { Assignment } from "../services/AssignmentsService";
import Log from "log4fns";
import { arrayToObject } from "../lib/arrayToObject";
import ScoreService, { AssignmentsScore } from "../services/ScoreService";

@Injectable
export default class ScoreController {
    @Inject(ScoreService)
    protected service: ScoreService;

    @GET("/assignment/score/all/:user_id")
    async getAll(req: Request, res: Response): Promise<AssignmentsScore> {
        const {  user_id } = req.params;
        return this.service.getAllScore(parseInt(user_id));
    }

    @GET("/assignment/score/:assignment_id/:user_id")
    async get(req: Request, res: Response): Promise<AssignmentsScore> {
        const { assignment_id, user_id } = req.params;
        return this.service.getScoreById(parseInt(assignment_id), parseInt(user_id));
    }

    @POST("/assignment/score/:assignment_id/:user_id")
    async create(req: Request, res: Response): Promise<AssignmentsScore> {
        const { assignment_id, user_id } = req.params;
        const { score } = req.body;
        const obj = {
            score,
            assignment_id: parseInt(assignment_id),
            user_id: parseInt(user_id),
        };
        return this.service.create(obj)
        return this.service.createScore(obj);
    }
}
