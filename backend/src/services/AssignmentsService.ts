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

    async getById(id: string) {
        return await this.db.knex
            .select(
                "questions.*",
                "questions.id as question_id",
                "answers.question_id as ans_question_id",
                "answers.answer"
            )
            .from("questions")
            .leftJoin("answers", "questions.id", "answers.question_id")
            .where("questions.assignment_id", "=", id)
            .orderBy("questions.assignment_id");
    }

    async getCompleteStatus(userId: string) {
        return this.db.knex
            .select(
                "assignments.id as assignment_id",
                this.db.knex.raw("count(questions.id) as num_questions"),
                this.db.knex.raw("count(case when student_answers.issubmit = true then 1 end) as num_submitted"),
                this.db.knex.raw("count(case when student_answers.issubmit = false then 1 end) as num_draft")
            )
            .from("assignments")
            .innerJoin("questions", "assignments.id", "questions.assignment_id")
            .leftJoin("student_answers", function () {
                this.on("questions.id", "student_answers.question_id").andOnIn("student_answers.user_id", userId);
            })
            .groupBy("assignments.id", "questions.id")
            .orderBy("assignments.id")
        /* return await this.db.knex
            .select(
                "assignments.id as assignment_id",
                //this.db.knex.count('questions.id as num_questions'),
                //this.db.knex.raw("count(questions.id) as num_questions"),
                this.db.knex.raw("count(student_answers.id) as num_submitted")
            )
            .count("questions.id as num_questions")
            .from("assignments")
            .innerJoin("questions", "assignments.id", "questions.assignment_id")
            .leftJoin("student_answers", function () {
                this.on("questions.id", "student_answers.question_id")
                    .andOnIn("student_answers.issubmit", [true, "true"])
                    .andOnIn("student_answers.user_id", userId);
            })
            .groupBy("assignments.id", "questions.id"); */
    }

    async getCompletedByUserId(userId: string) {
        return await this.db.knex
            .select(
                "assignments.*",
                "questions.*",
                "student_answers.answer as student_answer",
                "student_answers.issubmit as issubmit"
            )
            .from("assignments")
            .join("questions", "assignments.id", "questions.assignment_id")
            .join("student_answers", function () {
                this.on("questions.id", "=", "student_answers.question_id");
            })
            .where("student_answers.user_id", "=", userId)
            .orderBy("assignments.id")
            .orderBy("questions.id");
    }

    async getQuestionAndAnswer(assignmentId: string) {}
}

export interface Assignment {
    id: number;
}
