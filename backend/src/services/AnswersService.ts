import Injectable from "../decorators/injectable";
import ModelService from "./ModelService";

@Injectable
export default class AnswersService extends ModelService<Answer> {
    id: number;
    question_id: number;
    content: string;

    constructor() {
        super("answers");
    }
}

export interface Answer {
    id: number;
    question_id: number;
    answer: string;
}
