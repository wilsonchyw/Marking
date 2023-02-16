import Injectable from "../decorators/injectable";
import ModelService from "./ModelService";

@Injectable
export default class QuestionService extends ModelService<Question> {
    id: number;
    type: string;
    content: string;
    assignment_id: number;

    constructor() {
        super("questions");
    }
}

export interface Question {
    id: number;
    type: string;
    content: string;
    assignment_id: number;
}
