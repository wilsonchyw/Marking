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

    async getAllQuestionAndAnswer() {
        return await this.db.knex
            .select("assignments.*", "questions.*", "answers.*")
            .from("assignments")
            .join("questions", "assignments.id", "questions.assignment_id")
            .join("answers", function () {
                this.on("questions.id", "=", "answers.question_id");
            })
            .orderBy("assignments.id")
            .orderBy("questions.id");
    }
}

export interface Question {
    id: number;
    type: string;
    content: string;
    assignment_id: number;
}
