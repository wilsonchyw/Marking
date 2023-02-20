import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import RequestAuth from "../decorators/requireAuth";
import { GET, POST } from "../decorators/restful";
import { INSTRUCTOR, STUDENT } from "../lib/constant";
import ScoreService, { AssignmentsScore } from "../services/ScoreService";
import AssignmentsService from "../services/AssignmentsService";
import EmailService from "../services/EmailService";
import UserService from "../services/UserService";
import Log from "log4fns";

@Injectable
export default class ScoreController {
    @Inject(ScoreService)
    protected service: ScoreService;

    @Inject(AssignmentsService)
    private assignMentservice: AssignmentsService;

    @Inject(UserService)
    private userService: UserService;

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
        const scoredObj = await this.service.createScore(obj);
        await this.notifyIfAllScored(user_id);
        return scoredObj;
    }

    async notifyIfAllScored(user_id: string) {
        const assignments = await this.assignMentservice.getCompleteStatus(user_id);
        const allScored = !assignments.some((x) => x.score == null);
        if (allScored) {
            const student = await this.userService.getBy("id", user_id);
            const { email, firstName, lastName } = student[0];
            const emailOption = {
                receiver: email,
                title: "Assignment marking completed",
                content: `Dear ${lastName} ${firstName}\nYou assignment marking is complete, please check in the system`,
            };
            await EmailService.sendEmail(emailOption);
        }
    }
}
