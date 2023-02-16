import { Request, Response } from "express";
import Inject from "../decorators/inject";
import Injectable from "../decorators/injectable";
import { GET } from "../decorators/restful";
import AssignmentsService, { Assignment } from "../services/AssignmentsService";

@Injectable
export default class AssignmentsController {
    @Inject(AssignmentsService)
    protected service: AssignmentsService;
    public static defaultPath = "/question";

    @GET("/assignment")
    async get(req: Request, res: Response): Promise<Assignment[]> {
        return this.service.getAll();
    }
}
