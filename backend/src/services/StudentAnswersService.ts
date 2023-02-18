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

    /**
     * Retrieves the answers submitted by a student for a particular assignment.
     * @async
     * @function getStudentAnsForAssignment
     * @param {string} userId - The ID of the user for whom to retrieve the answers.
     * @param {string} assignmentId - The ID of the assignment for which to retrieve the answers.
     * @returns {Promise<Array>} A promise that resolves to an array of objects, where each object represents a question in the assignment, along with the student's answer and submission status.
     * @throws {Error} Throws an error if the database query fails.
     */
    async getStudentAnsForAssignment(userId: string, assignmentId: string) {
        return await this.db.knex
            .select(
                "assignments.id as assignment_id",
                "questions.id as question_id",
                //"student_answers.*",
                "student_answers.id as student_answers_id",
                "student_answers.answer as student_answer",
                "student_answers.issubmit as issubmit"
            )
            .from("assignments")
            .join("questions", "assignments.id", "questions.assignment_id")
            .join("student_answers", function () {
                this.on("questions.id", "=", "student_answers.question_id");
                /* .andOnIn("student_answers.issubmit", [
                    true,
                    "true",
                ]); */
            })
            .where("student_answers.user_id", "=", userId)
            .andWhere("assignments.id", "=", assignmentId)
            .orderBy("questions.id");
    }

    async updateStudentAns(id: number, studentAnswer: StudentAnswer) {
        //const { user_id, question_id, student_answers_id, ...rest } = studentAnswer;
        return await this.db.knex(this.tableName).where({ id }).whereNot('issubmit',true).update(studentAnswer);
    }

    async getByUserIdAndQuestionId(user_id, question_id) {
        return this.db.knex(this.tableName).select("*").where({ user_id, question_id }).first();
    }
}

export interface StudentAnswer {
    id?: number;
    user_id: number;
    question_id: number;
    answer: string;
    issubmit: boolean;
}
