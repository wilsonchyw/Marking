import Injectable from "../decorators/injectable";
import ModelService from "./ModelService";

@Injectable
export default class StudentAnswersService extends ModelService<StudentAnswer> {
    id: number;
    student_id: number;
    question_id: number;
    answer_id: number;

    constructor() {
        super("student_answers");
    }
}

export interface StudentAnswer {
    id: number;
    user_id: number;
    question_id: number;
    answer: string;
}
