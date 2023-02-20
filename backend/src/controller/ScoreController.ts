import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import RequestAuth from "../decorators/requireAuth";
import { GET, POST } from "../decorators/restful";
import { INSTRUCTOR, STUDENT } from "../lib/constant";
import ScoreService, { AssignmentsScore } from "../services/ScoreService";

@Injectable
export default class ScoreController {
    @Inject(ScoreService)
    protected service: ScoreService;

    @RequestAuth(STUDENT)
    @GET("/assignment/score/all")
    async getAll(req: Request, res: Response): Promise<AssignmentsScore> {
        const { id } = req.user;
        return this.service.getAllScore(id);
    }

    /**
     * Retrieves the score for a specific assignment for the current authenticated student user.
     *
     * @function
     * @async
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<AssignmentsScore>} The score for the assignment.
     */
    @RequestAuth(INSTRUCTOR)
    @GET("/instructor/assignment/:assignment_id/:user_id")
    async get(req: Request, res: Response): Promise<AssignmentsScore> {
        const { assignment_id, user_id } = req.params;
        return this.service.getScoreById(parseInt(assignment_id), parseInt(user_id));
    }

    /**
     * Creates a new score for a specific assignment and user, for the current authenticated instructor user.
     *
     * @function
     * @async
     * @param {Request} req - The request object.
     * @param {Response} res - The response object.
     * @returns {Promise<AssignmentsScore>} The newly created score.
     */
    @RequestAuth(INSTRUCTOR)
    @POST("/instructor/assignment/:assignment_id/:user_id")
    async create(req: Request, res: Response): Promise<AssignmentsScore> {
        const { assignment_id, user_id } = req.params;
        const { score } = req.body;
        const obj = {
            score,
            assignment_id: parseInt(assignment_id),
            user_id: parseInt(user_id),
        };
        return this.service.createScore(obj);
    }
}
