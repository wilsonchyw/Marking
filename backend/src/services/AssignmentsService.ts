import Injectable from "../decorators/injectable";
import ModelService from "./ModelService";

@Injectable
export default class AssignmentsService extends ModelService<Assignment> {
    id: number;
    published: boolean;
    publish_at: Date;

    constructor() {
        super("assignments");
    }
}

export interface Assignment {
    id: number;
    published: string;
    publish_at: Date;
  }